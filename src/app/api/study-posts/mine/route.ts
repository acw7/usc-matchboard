import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/server/session";
import { json, unauthorized } from "@/lib/server/http";

export async function GET() {
  try {
    const session = await requireSession();
    const posts = await prisma.studyPost.findMany({
      where: { user: { email: session.user!.email! } },
      orderBy: { createdAt: "desc" }
    });
    return json({ posts });
  } catch (e: any) {
    if (e?.message === "UNAUTHORIZED") return unauthorized();
    return json({ error: "Internal error" }, { status: 500 });
  }
}
