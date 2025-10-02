import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("search") || "").trim();

  const where = q
    ? {
        OR: [
          { code:  { contains: q, mode: "insensitive" } },
          { title: { contains: q, mode: "insensitive" } },
        ],
      }
    : {};

  const courses = await prisma.course.findMany({
    where,
    include: { sections: true },
    orderBy: { code: "asc" },
    take: 25,
  });

  return NextResponse.json({ courses });
}
