import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json()
  const { name, username } = body;

  const user = await prisma.user.create({
    data: {username, name}
  })

  return NextResponse.json(user, {
    status: 201,
  })
}