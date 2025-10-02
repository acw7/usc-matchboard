import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";

type Row = {
  code: string;
  title: string;
  dept: string;
  section_number: string;
  days: string;
  start: string;
  end: string;
  instructor?: string | null;
};

function norm(s: string) {
  return s.trim();
}

async function main() {
  const csvPath = path.join(process.cwd(), "data/courses.csv");
  const csv = fs.readFileSync(csvPath, "utf8");

  // Normalize header names: trim + lowercase; handle BOM
  const rows = parse(csv, {
    bom: true,
    skip_empty_lines: true,
    columns: (headers) =>
      headers.map((h: string) => h.trim().toLowerCase()),
  }) as Row[];

  if (!rows.length) {
    throw new Error("No rows parsed from data/courses.csv");
  }

  // Basic validation: fail fast if required columns missing
  for (const [i, r] of rows.entries()) {
    if (!r.code || !r.title || !r.dept || !r.section_number) {
      throw new Error(
        `Row ${i + 1} missing required fields: ` +
        JSON.stringify(r, null, 2)
      );
    }
  }

  const byCode: Record<string, Row[]> = {};
  for (const r of rows) {
    const code = norm(r.code);
    (byCode[code] ??= []).push(r);
  }

  for (const [code, list] of Object.entries(byCode)) {
    const first = list[0];
    const course = await prisma.course.upsert({
      where: { code },
      update: { title: norm(first.title), dept: norm(first.dept) },
      create: { code, title: norm(first.title), dept: norm(first.dept) },
    });

    for (const r of list) {
      await prisma.section.upsert({
        where: { number: norm(r.section_number) }, // relies on @unique
        update: {
          courseId: course.id,
          days: norm(r.days),
          start: norm(r.start),
          end: norm(r.end),
          instructor: r.instructor ? norm(r.instructor) : null,
        },
        create: {
          courseId: course.id,
          number: norm(r.section_number),
          days: norm(r.days),
          start: norm(r.start),
          end: norm(r.end),
          instructor: r.instructor ? norm(r.instructor) : null,
        },
      });
    }
  }

  console.log("✅ Seeded courses & sections");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });