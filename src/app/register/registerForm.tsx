"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StepperLayout from "@/components/ui/origin_ui/stepperLayout";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { api } from "@/lib/axios";

export default function RegisterForm() {
  const useFormSchema = z.object({
    username: z
      .string()
      .min(3, { message: "Usuário precisa ter pelo menos 3 caracteres" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "O Usuário pode conter apennas letras",
      }),
    name: z
      .string()
      .min(2, { message: "O Nome precisa ter pelo menos 2 caracteres" })
      .toLowerCase(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(useFormSchema),
  });

  const router = useRouter();

  console.log(router);

  const searchParams = useSearchParams();

  useEffect(() => {
    const username = searchParams.get("username");
    if (username) {
      setValue("username", username);
    }
  }, [searchParams, setValue]);

  type RegisterFormData = z.infer<typeof useFormSchema>;

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post("/users", {
        name: data.name,
        username: data.username,
      })

    } catch(error) {
      console.log("Erro ao registrar usuário:", error);
      
    }
  }

  return (
    <div className="flex flex-col items-center justify-center text-justify min-h-screen ">
      <header className="w-full max-w-xl text-center mb-8 rounded-md p-10 border border-emerald-500">
        <strong className="flex text-md md:text-2xl font-bold text-white mb-2 sm:text-2xl">
          Bem-vindo ao Ignite Call!
        </strong>
        <p className="text-gray-300 text-base md:text-lg mb-8 text-justify">
          Precisamos de algumas informações para criar seu perfil!
          <br />
          Ah, você pode editar essas informações depois.
        </p>
        <StepperLayout />
        <div>
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="grid grid-cols-1 mt-10 p-4 rounded-md"
          >
            <label className="text-white font-bold text-1xl text-left">
              Nome de usuário
            </label>
            <div className="grid grid-cols-1 gap-4 mt-2">
              <Input
                placeholder="Digite seu nome de usuário"
                type="text"
                {...register("username")}
              />
              {errors.username ? (
                <span className="text-red-500 text-left">
                  {errors.username.message}
                </span>
              ) : (
                <span className="text-gray-400 text-left">
                  É necessário um usuário válido para continuar.
                </span>
              )}
              <label className="text-white font-bold text-1xl text-left">
                Nome completo
              </label>
              <Input
                placeholder="Digite seu nome completo"
                type="text"
                {...register("name")}
              />
              {errors.name ? (
                <span className="text-red-500 text-left">
                  {errors.name.message}
                </span>
              ) : (
                <span className="text-gray-400 text-left">
                  É necessário um nome válido para continuar.
                </span>
              )}
            </div>
            <Button
              disabled={isSubmitting}
              variant="default"
              className="mt-4 bg-emerald-700"
            >
              Próximo passo <ArrowRight />
            </Button>
          </form>
        </div>
      </header>
    </div>
  );
}
