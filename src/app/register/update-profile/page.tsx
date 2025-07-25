"use client";
import { Button } from "@/components/ui/button";
import StepperLayout from "@/components/ui/origin_ui/stepperLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const updateProfileSchema = z.object({
  bio: z
    .string()
    .min(1, "Bio é obrigatória")
    .max(160, "Máximo de 160 caracteres"),
});

type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export default function UpdateProfile() {
  const router = useRouter();

  type SessionUserWithId = {
    id?: string;
    bio?: string;
    image?: string;
    username?: string;
  };

  type SessionWithUserId = {
    user?: SessionUserWithId;
    status: "authenticated" | "unauthenticated" | "loading";
  };

  const sessionResult = useSession() as {
    data: SessionWithUserId | null;
    status: "authenticated" | "unauthenticated" | "loading";
  };
  const session = sessionResult.data;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
  });

  async function handleUpdateProfile(data: UpdateProfileData) {
    if (!session?.user?.id) {
      toast.error("Usuário não autenticado.");
      return;
    }

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bio: data.bio,
          userId: session.user.id,
        }),
      });

      if (response.ok) {
        toast.success("Perfil atualizado com sucesso!");
        router.push(`/schedule/${session?.user?.username}`);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Erro ao atualizar perfil.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error("Erro ao atualizar perfil.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center text-justify min-h-screen ">
      <header className="w-full max-w-xl text-center mb-8 rounded-md p-10 border border-emerald-500">
        <strong className="flex text-md md:text-2xl font-bold text-white mb-2 sm:text-2xl">
          Defina sua disponibilidade
        </strong>
        <p className="text-gray-300 text-base md:text-lg mb-8 text-justify">
          Por último, uma breve descrição e uma foto de perfil.
        </p>
        <StepperLayout currentStep={4} />
        <form onSubmit={handleSubmit(handleUpdateProfile)} className="w-full">
          <div className="flex justify-between w-full mt-8">
            <Avatar className="w-8 h-8">
              <AvatarImage src={session?.user?.image ?? undefined} />
              <AvatarFallback>Image</AvatarFallback>
            </Avatar>
            <div>
              <Button className="bg-emerald-600" variant="default">
                Selecionar foto de perfil
              </Button>
            </div>
          </div>
          <div className="text-left mt-4 font-bold">
            <label className="text-white">Fale um pouco sobre você!</label>
          </div>
          <div>
            <Textarea
              {...register("bio")}
              className="mt-4 border-2 !border-emerald-600 !placeholder:text-white"
              placeholder="Sobre você"
            ></Textarea>
          </div>
          <p className="text-white text-right mt-4 font-bold">
            Isso será exibido no painel principal.
          </p>
          <div className="flex mt-8 text-center justify-center w-full">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-600 w-full"
            >
              {isSubmitting ? "Carregando..." : "Finalizar"} <ArrowRight />
            </Button>
          </div>
        </form>
      </header>
    </div>
  );
}
