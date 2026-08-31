import { Link } from "react-router-dom";
import { Card, EmptyState, MetricCard, Progress } from "../components/ui";
import { useAppStore } from "../store/useAppStore";
import { formatCurrency } from "../utils/format";

export function Overview() {
  const result = useAppStore((state) => state.result);
  const installProgress = useAppStore((state) => state.installProgress);

  if (!result) {
    return (
      <EmptyState
        title="Seu EcoVolts ainda não foi iniciado"
        text="Rode o diagnóstico para liberar sua jornada no painel."
        actionLabel="Começar diagnóstico"
        to="/diagnostico"
      />
    );
  }

  return (
    <div className="grid">
      <div className="section-header">
        <span className="eyebrow">Meu EcoVolts</span>
        <h1>Seu EcoVolts</h1>
      </div>
      <Card tone="strong">
        <div className="grid grid--4">
          <MetricCard label="Plano recomendado" value={result.kit.name.replace("EcoVolts ", "")} />
          <MetricCard label="Economia estimada" value={`${formatCurrency(result.savingMin)}-${formatCurrency(result.savingMax)}/mês`} />
          <MetricCard label="Etapa atual" value="Simulação" />
          <MetricCard label="Progresso" value={`${Math.round((installProgress / 5) * 100)}%`} />
        </div>
        <Progress value={(installProgress / 5) * 100} />
        <div className="actions">
          <Link className="button button--primary button--md" to="/meu-ecovolts/aquisicao">
            Continuar
          </Link>
        </div>
      </Card>
    </div>
  );
}
