import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";


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

  const cookieStore = await cookies();
  cookieStore.set('session', user.id, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });

  const sessionCookie = cookieStore.get("session");

  console.log('Session Cookie:', sessionCookie);

  return NextResponse.json(user, { status: 201 });
}