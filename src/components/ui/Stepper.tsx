import { Badge } from "./Badge";

type StepStatus = "done" | "current" | "pending";

export function Stepper({ steps }: { steps: Array<{ label: string; status: StepStatus }> }) {
  return (
    <ol className="stepper">
      {steps.map((step, index) => (
        <li key={step.label} className={`stepper__item stepper__item--${step.status}`}>
          <span>{index + 1}</span>
          <div>
            <strong>{step.label}</strong>
            <Badge tone={step.status === "done" ? "success" : step.status === "current" ? "info" : "neutral"}>
              {step.status === "done" ? "Concluído" : step.status === "current" ? "Atual" : "Pendente"}
            </Badge>
          </div>
        </li>
      ))}
    </ol>
  );
}
