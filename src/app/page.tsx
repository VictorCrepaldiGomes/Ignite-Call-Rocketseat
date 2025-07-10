
import Username from "@/components/username/username";
import previewImage from "../../src/assets/images/imagePreview.png";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className="
    flex 
    justify-center 
    items-center 
    gap-20 
    ml-auto 
    max-w-[calc(100vw-(100vw - 1160px) / 2)] 
    h-screen mx-auto
    overflow-hidden
    
    "
    >
      <div className="max-w-[480px] p-10">
        <h1 className="text-4xl font-bold">Agendamento descomplicado</h1>
        <p className="lg pt-4 text-gray-400 pb-2">
          Conecte seu calendário e permite que as pessoas marquem agendamentos no seu tempo livre.
        </p>
        <div>
          <Username />
        </div>

      </div>
      <div className="pr-8 overflow-hidden hidden md:block">
        <Image
          src={previewImage}
          alt=""
          quality={100}
          priority
          height={400}
          width={500}
        />
      </div>
    </div>
  );
}
