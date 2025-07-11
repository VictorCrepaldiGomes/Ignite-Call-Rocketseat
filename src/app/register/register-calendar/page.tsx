import { Suspense } from "react";
import RegisterCalendar from "./register-calender";

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterCalendar />
    </Suspense>
  );
}