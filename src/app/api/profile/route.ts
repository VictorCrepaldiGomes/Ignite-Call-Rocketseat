import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { bio, userId } = body;

  if (!bio || !userId) {
    return Response.json(
      { error: "Bio e userId são obrigatórios" },
      { status: 400 }
    );
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { bio },
    });
    return Response.json(
      { message: "Bio atualizada com sucesso" },
      { status: 200 }
    );
  } catch {
    return Response.json({ error: "Erro ao atualizar bio" }, { status: 500 });
  }
}
