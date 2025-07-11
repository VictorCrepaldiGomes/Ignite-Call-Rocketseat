"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

export default function Username() {
  const usernameFormSchema = z.object({
    username: z
      .string()
      .min(3, { message: "Usuário deve ter pelo menos 3 caracteres" })
      .regex(/^[a-zA-Z]+$/, { message: "Usuário deve conter apenas letras" })
      .toLowerCase(),
  });

  type UsernameFormData = z.infer<typeof usernameFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UsernameFormData>({
    resolver: zodResolver(usernameFormSchema),
  });

  const router = useRouter();

  async function handlePreRegister(data: UsernameFormData) {
    const { username } = data;

    await router.push(`/register?username=${username}`);

    
  }

  return (
    <form
      onSubmit={handleSubmit(handlePreRegister)}
      className="grid grid-cols-1 gap-4 w-90 p-2 rounded-md"
    >
      <Input
        type="text"
        className="text-sm p-2 rounded-md border border-emerald-600 outline-0  focus:border-emerald-500"
        placeholder="Digite seu nome de usuário"
        required
        {...register("username")}
      />
      <div className="">
        <Button className="bg-emerald-700" disabled={isSubmitting}>
            Reservar usuário
            <ArrowRight />
        </Button>
        <div className="mt-4 text-gray-500">
          {errors.username ? (
            <span>{errors.username.message}</span>
          ) : (
            "Digite o nome do usuário desejado"
          )}
        </div>
      </div>
    </form>
  );
}
