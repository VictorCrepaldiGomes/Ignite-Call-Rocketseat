"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import StepperLayout from "@/components/ui/origin_ui/stepperLayout";
import { getWeekDays } from "@/utils/get-week-days";
import { ArrowRight } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import z from "zod";

const timeInvertalsFormSchema = z.object({});

export default function RegisterIntervals() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
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

  const weekDays = getWeekDays();

  const { fields } = useFieldArray({
    control,
    name: "intervals",
  });

  const intervals = watch("intervals");

  async function handleSetTimeIntervals() {}

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
        {fields.map((field, index) => (
          <form onSubmit={handleSubmit(handleSetTimeIntervals)} key={field.id}>
            <Card className="flex mt-4 !border-none p-2 px-0">
              <CardContent className="flex items-center justify-between w-full p-0">
                <div className="flex items-center gap-2">
                  <Controller
                    name={`intervals.${field.weekDay}.enabled`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Checkbox
                          onCheckedChange={(checked) =>
                            field.onChange(checked === true)
                          }
                          checked={field.value}
                        />
                      );
                    }}
                  />
                  <strong className="text-white">
                    {weekDays[field.weekDay]}
                  </strong>
                </div>
                <div className="flex gap-8">
                  <input
                    className="text-white"
                    type="time"
                    value={field.startTime}
                    disabled={intervals[index].enabled === false}
                    {...register(`intervals.${field.weekDay}.startTime`)}
                  />
                  <input
                    className="text-white"
                    type="time"
                    value={field.endTime}
                    disabled={intervals[index].enabled === false}
                    {...register(`intervals.${field.weekDay}.endTime`)}
                  />
                </div>
              </CardContent>
            </Card>
          </form>
        ))}
        <Button className="bg-emerald-700 w-full mt-4">
          Próximo passo <ArrowRight />
        </Button>
      </header>
    </div>
  );
}
