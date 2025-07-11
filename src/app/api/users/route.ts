import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, username } = body;

  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "Usuário já existe" },
      { status: 400 }
    );
  }

  const user = await prisma.user.create({
    data: { username, name },
  });

  return NextResponse.json(user, { status: 201 });
}