import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/server/session";
import { json, badRequest, unauthorized } from "@/lib/server/http";
import { StudyPostPatch } from "@/lib/validation/studyPost";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireSession();
    const body = await req.json();
    const parsed = StudyPostPatch.safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.errors.map(e=>e.message).join("; "));

    const post = await prisma.studyPost.findUnique({ where: { id: params.id }, include: { user: true } });
    if (!post || post.user.email !== session.user!.email) return unauthorized();

    const updated = await prisma.studyPost.update({ where: { id: params.id }, data: parsed.data });
    return json({ post: updated });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") return unauthorized();
    return json({ error: "Internal error" }, { status: 500 });
  }
}
