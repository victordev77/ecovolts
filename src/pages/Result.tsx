import { Link } from "react-router-dom";
import { Alert, Card, EmptyState, MetricCard } from "../components/ui";
import { useAppStore } from "../store/useAppStore";
import { formatCurrency, formatKwh } from "../utils/format";

export function Result() {
  const result = useAppStore((state) => state.result);
  const profile = useAppStore((state) => state.profile);

  if (!result || !profile) {
    return (
      <EmptyState
        title="Comece pelo diagnóstico"
        text="Informe sua realidade para receber uma recomendação demonstrativa."
        actionLabel="Começar diagnóstico"
        to="/diagnostico"
      />
    );
  }

  const reasons = [
    `Seu consumo informado aponta para ${formatKwh(result.generationMin)} a ${formatKwh(result.generationMax)} por mês.`,
    `O plano equilibra economia estimada e investimento para ${profile.city}.`,
    `A economia conservadora fica em ${formatCurrency(result.conservativeSaving)} por mês.`,
  ];

  return (
    <section className="page">
      <div className="section-header">
        <span className="eyebrow">Resultado</span>
        <h1>Encontramos um plano para você.</h1>
      </div>

      <Card tone="strong">
        <div className="split-head">
          <div>
            <span className="badge badge--success">{result.kit.badge}</span>
            <h2>{result.kit.name}</h2>
            <p>{result.kit.objective}</p>
          </div>
          <span className="demo-note">Valores simulados.</span>
        </div>
        <div className="grid grid--4">
          <MetricCard label="Economia estimada" value={`${formatCurrency(result.savingMin)}-${formatCurrency(result.savingMax)}/mês`} />
          <MetricCard label="Geração estimada" value={`${formatKwh(result.generationMin)}-${formatKwh(result.generationMax)}`} />
          <MetricCard label="Economia conservadora" value={`${formatCurrency(result.conservativeSaving)}/mês`} />
          <MetricCard label="Viabilidade" value={result.confidence === "Alta" ? "Boa" : result.confidence} />
        </div>
      </Card>

      <section className="section grid grid--2">
        <Card>
          <h2>Por que recomendamos este plano?</h2>
          <ul>
            {reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2>Próximo passo</h2>
          <p>Simule a forma de aquisição e veja como a parcela conversa com sua economia conservadora.</p>
          <div className="button-row">
            <Link className="button button--primary button--md" to="/meu-ecovolts/aquisicao">
              Simular aquisição
            </Link>
            <Link className="button button--secondary button--md" to="/solucoes">
              Comparar planos
            </Link>
          </div>
        </Card>
      </section>

      <Alert tone="info">
        Diagnósticos exigem validação técnica em uma operação real. Backup depende de sistema compatível.
      </Alert>
    </section>
  );
}
