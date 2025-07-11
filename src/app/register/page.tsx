import { Suspense } from "react";
import RegisterForm from "./registerForm";

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}