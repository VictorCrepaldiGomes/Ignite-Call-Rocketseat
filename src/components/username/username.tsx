// import { ArrowRight } from 'phosphor-react';

import { ArrowRight } from "lucide-react";

export default function Username() {
  return (
    <form className="grid grid-cols-1 gap-4 w-90 p-2 rounded-md">
      <input
        type="text"
        className="text-sm p-2 rounded-md border border-emerald-600 outline-0  focus:border-emerald-500"
        placeholder="Digite seu nome de usuário"
        required
      />
      <div className="">
        <button
          className="bg-emerald-600 rounded-md p-2 flex items-center justify-center cursor-pointer"
          type="submit"
        >
          Reservar usuário
          <ArrowRight className="ml-2" />
        </button>
      </div>
    </form>
  );
}
