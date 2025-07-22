import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const {bio} = body;

    if (!bio) {
        return Response.json({ error: "Bio é obrigatória" }, { status: 400 });
    }

    await prisma.user.update({
        where: { id: body.userId },
        data: { bio },

    })
    return Response.json({ message: "Bio atualizada com sucesso" }, { status: 200 });

}