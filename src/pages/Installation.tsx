import { useNavigate } from "react-router-dom";
import { Button, Card, EmptyState, Stepper } from "../components/ui";
import { useAppStore } from "../store/useAppStore";

const steps = ["Plano escolhido", "Simulação concluída", "Validação técnica", "Instalação", "Ativação"];

export function Installation() {
  const navigate = useNavigate();
  const result = useAppStore((state) => state.result);
  const progress = useAppStore((state) => state.installProgress);
  const advanceInstallation = useAppStore((state) => state.advanceInstallation);
  const careActive = useAppStore((state) => state.careActive);

  if (!result) {
    return (
      <EmptyState
        title="Instalação ainda não iniciada"
        text="Conclua o diagnóstico e a simulação de aquisição para abrir esta etapa."
        actionLabel="Começar diagnóstico"
        to="/diagnostico"
      />
    );
  }

  const timeline = steps.map((label, index) => ({
    label,
    status: index + 1 < progress ? ("done" as const) : index + 1 === progress ? ("current" as const) : ("pending" as const),
  }));

  function handleNext() {
    if (careActive) {
      navigate("/meu-ecovolts/care");
      return;
    }
    advanceInstallation();
  }

  return (
    <div className="grid">
      <div className="section-header">
        <span className="eyebrow">Instalação</span>
        <h1>Etapas do seu sistema</h1>
      </div>
      <Card>
        <Stepper steps={timeline} />
      </Card>
      <Card tone="strong">
        <h2>Próxima etapa</h2>
        <p>
          {careActive
            ? "Seu sistema está ativado. O EcoVolts Care já pode ser acessado."
            : progress === 3
              ? "Validação técnica"
              : progress === 4
                ? "Instalação"
                : "Ativação"}
        </p>
        <Button type="button" onClick={handleNext}>
          {careActive ? "Abrir EcoVolts Care" : progress === 3 ? "Simular validação concluída" : "Simular instalação"}
        </Button>
      </Card>
    </div>
  );
}
