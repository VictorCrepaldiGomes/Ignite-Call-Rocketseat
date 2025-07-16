import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  
  const { userId, intervals } = body;

  if (!userId || !intervals || !Array.isArray(intervals)) {
    return Response.json({ error: "Dados inválidos" }, { status: 400 });
  }

  type Interval = {
    weekDay: number;
    startTimeInMinutes: number;
    endTimeInMinutes: number;
  };

  await prisma.userTimeInterval.createMany({
    data: intervals.map((interval: Interval) => ({
      week_day: interval.weekDay,
      time_start_in_minutes: interval.startTimeInMinutes,
      time_end_in_minutes: interval.endTimeInMinutes,
      userId,
    })),
  });

  return Response.json({ message: "Intervalos salvos com sucesso!" });
}