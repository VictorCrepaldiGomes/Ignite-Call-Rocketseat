"use client";

import { Button } from "@/components/ui/button";
import StepperLayout from "@/components/ui/origin_ui/stepperLayout";
import { ArrowRight, Check } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

export default function RegisterCalendar() {
  const session = useSession();

  console.log(session);

  
  return (
    <div className="flex flex-col items-center justify-center text-justify min-h-screen ">
      <header className="w-full max-w-xl text-center mb-8 rounded-md p-10 border border-emerald-500">
        <strong className="flex text-md md:text-2xl font-bold text-white mb-2 sm:text-2xl">
          Conecte com sua agenda!
        </strong>
        <p className="text-gray-300 text-base md:text-lg mb-8 text-justify">
          Conecte o seu calendário para que possamos verificar sua
          disponibilidade.
        </p>
        <StepperLayout currentStep={2} />
        <form className="mt-10 flex flex-col items-center gap-4">
          <div className="flex items-center justify-between w-full">
            <label className="text-white  ">Google Calendar</label>
            <Button
              variant="outline"
              className="w-40"
              type="button"
              onClick={() => signIn("google")}
              disabled={session.status === "authenticated"}
            >
              {session.status === "authenticated" ? <Check/> : "Conectar"}
            </Button>
          </div>
          <Button className="bg-emerald-700 w-full">
            {session.status === "authenticated" ? "Próximo passo" : "É necessário conectar no Google Calendar"} <ArrowRight />
          </Button>
        </form>
      </header>
    </div>
  );
}
