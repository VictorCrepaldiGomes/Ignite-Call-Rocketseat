import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/origin_ui/stepper";

const steps = [
  {
    step: 1,
    title: "Passo 1",
  },
  {
    step: 2,
    title: "Passo 2",
  },
  {
    step: 3,
    title: "Passo 3",
  },
  {
    step: 4,
    title: "Passo 4",
  },
];

export default function Component() {
  return (
    <div className="mx-auto max-w-xl space-y-8 text-center ">
      <Stepper defaultValue={2} className="items-start gap-4">
        {steps.map(({ step, title }) => (
          <StepperItem key={step} step={step} className="flex-1 ">
            <StepperTrigger className="w-full flex-col items-start gap-2 rounded ">
              <StepperIndicator asChild className="bg-border h-1 w-full ">
                <span className="sr-only">{step}</span>
              </StepperIndicator>
              <div className="space-y-0.5">
                <StepperTitle className="text-white ">{title}</StepperTitle>
              </div>
            </StepperTrigger>
          </StepperItem>
        ))}
      </Stepper>
    </div>
  );
}
