"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import StepperLayout from "@/components/ui/origin_ui/stepperLayout";
import { getWeekDays } from "@/utils/get-week-days";
import { timeToString } from "@/utils/time-to-string";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      })
    )
    .length(7)
    .refine((intervals) => intervals.some((interval) => interval.enabled), {
      message: "Você deve selecionar pelo menos um dia da semana.",
    })

    .refine(
      (intervals) =>
        intervals
          .filter((i) => i.enabled)
          .every((i) => {
            const start = timeToString(i.startTime);
            const end = timeToString(i.endTime);
            return end - 60 >= start;
          }),
      {
        message:
          "O horário de término deve ser pelo menos 1 hora após o horário de início.",
      }
    )
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .transform((intervals) =>
      intervals.map((interval) => ({
        weekDay: interval.weekDay,
        startTimeInMinutes: timeToString(interval.startTime),
        endTimeInMinutes: timeToString(interval.endTime),
      }))
    ),
});

type TimeIntervalsFormData = z.infer<typeof timeIntervalsFormSchema>;

export default function RegisterIntervals() {
  type SessionUserWithId = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id: string;
  };

  type SessionWithUserId = {
    user?: SessionUserWithId;
  };

  const { data: session } = useSession() as { data: SessionWithUserId | null };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: "09:00", endTime: "18:00" },
        { weekDay: 1, enabled: true, startTime: "09:00", endTime: "18:00" },
        { weekDay: 2, enabled: true, startTime: "09:00", endTime: "18:00" },
        { weekDay: 3, enabled: true, startTime: "09:00", endTime: "18:00" },
        { weekDay: 4, enabled: true, startTime: "09:00", endTime: "18:00" },
        { weekDay: 5, enabled: true, startTime: "09:00", endTime: "18:00" },
        { weekDay: 6, enabled: false, startTime: "09:00", endTime: "18:00" },
      ],
    },
  });

  const router = useRouter()

  const weekDays = getWeekDays();

  const { fields } = useFieldArray({
    control,
    name: "intervals",
  });

  const intervals = watch("intervals");

  async function handleSetTimeIntervals(data: TimeIntervalsFormData) {
    if (!session?.user?.id) {
      console.error("Usuário não autenticado");
      return;
    }
    await fetch("/api/intervals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: session.user.id,
        intervals: data.intervals,
      }),
    });
    if (!session.user.id) {
      toast.error("Erro ao definir horários. Usuário não autenticado.");
      return;
    }
    await router.push(`/register/update-profile`);
    toast.success("Horários definidos com sucesso!");
  }

  return (
    <div className="flex flex-col items-center justify-center text-justify min-h-screen ">
      <header className="w-full max-w-xl text-center mb-8 rounded-md p-10 border border-emerald-500">
        <strong className="flex text-md md:text-2xl font-bold text-white mb-2 sm:text-2xl">
          Quase lá
        </strong>
        <p className="text-gray-300 text-base md:text-lg mb-8 text-justify">
          Defina os intervalos de horários que você está disponível em cada dia
          da semana!
        </p>
        <StepperLayout currentStep={3} />
        <form onSubmit={handleSubmit(handleSetTimeIntervals)}>
          {fields.map((field, index) => (
            <Card className="flex mt-4 !border-none p-2 px-0" key={field.id}>
              <CardContent className="flex items-center justify-between w-full p-0">
                <div className="flex items-center gap-2">
                  <Controller
                    name={`intervals.${field.weekDay}.enabled`}
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        onCheckedChange={(checked) =>
                          field.onChange(checked === true)
                        }
                        checked={field.value}
                      />
                    )}
                  />
                  <strong className="text-white">
                    {weekDays[field.weekDay]}
                  </strong>
                </div>
                <div className="flex gap-8">
                  <input
                    className="text-white bg-emerald-700 rounded-md p-2"
                    type="time"
                    disabled={intervals[index].enabled === false}
                    {...register(`intervals.${field.weekDay}.startTime`)}
                  />
                  <input
                    className="text-white bg-emerald-700 rounded-md p-2"
                    type="time"
                    disabled={intervals[index].enabled === false}
                    {...register(`intervals.${field.weekDay}.endTime`)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            className="bg-emerald-700 w-full mt-4"
            disabled={isSubmitting}
          >
            Próximo passo <ArrowRight />
          </Button>
          {errors.intervals && (
            <strong className="text-red-500 mt-2 flex justify-center">
              {errors.intervals.root?.message}
            </strong>
          )}
        </form>
      </header>
    </div>
  );
}
