import { Link } from "react-router-dom";
import { Card, EmptyState, MetricCard } from "../components/ui";
import { useAppStore } from "../store/useAppStore";
import { formatCurrency, formatKwh, formatRange } from "../utils/format";

export function MySolution() {
  const result = useAppStore((state) => state.result);

  if (!result) {
    return (
      <EmptyState
        title="Nenhuma solução recomendada"
        text="O diagnóstico define o plano demonstrativo ideal para sua casa."
        actionLabel="Fazer diagnóstico"
        to="/diagnostico"
      />
    );
  }

  return (
    <div className="grid">
      <div className="section-header">
        <span className="eyebrow">Minha solução</span>
        <h1>{result.kit.name}</h1>
        <p>{result.kit.objective}</p>
      </div>
      <div className="grid grid--3">
        <MetricCard label="Faixa demonstrativa" value={formatRange(result.kit.priceRange[0], result.kit.priceRange[1])} />
        <MetricCard label="Geração estimada" value={`${formatKwh(result.generationMin)}-${formatKwh(result.generationMax)}`} />
        <MetricCard label="Conta após solar" value={formatCurrency(result.estimatedBillAfter)} />
      </div>
      <Card>
        <h2>Inclui</h2>
        <ul>
          {result.kit.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <Link className="button button--primary button--md" to="/meu-ecovolts/aquisicao">
          Simular aquisição
        </Link>
      </Card>
    </div>
  );
}
