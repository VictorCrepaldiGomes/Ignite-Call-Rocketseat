import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border border-emerald-500 text-emerald-500 bg-transparent rounded-md h-9 w-full px-3 py-1 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-700",
        className
      )}
      {...props}
    />
  );
}

export { Input };
