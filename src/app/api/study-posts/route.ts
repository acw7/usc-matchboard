import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/server/session";
import { json, badRequest, unauthorized } from "@/lib/server/http";
import { StudyPostCreate } from "@/lib/validation/studyPost";

export async function POST(req: Request) {
  try {
    const session = await requireSession();
    const body = await req.json();
    const parsed = StudyPostCreate.safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.errors.map(e=>e.message).join("; "));

    const user = await prisma.user.findUnique({ where: { email: session.user!.email! } });
    if (!user) return unauthorized();

    const post = await prisma.studyPost.create({
      data: { userId: user.id, ...parsed.data }
    });
    return json({ post });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") return unauthorized();
    return json({ error: "Internal error" }, { status: 500 });
  }
}
