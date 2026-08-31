import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Card, EmptyState, MetricCard, Modal, Tabs } from "../components/ui";
import { ECOVOLTS_CONFIG } from "../config/ecovolts.config";
import { FinancialEngine } from "../engines";
import { useAppStore } from "../store/useAppStore";
import type { AcquisitionMode } from "../types";
import { formatCurrency } from "../utils/format";

const modeTabs = [
  { value: "avista", label: "À vista" },
  { value: "financiamento", label: "Financiamento" },
  { value: "economia", label: "Pague com Economia" },
  { value: "social", label: "EcoVolts Social" },
] satisfies Array<{ value: AcquisitionMode; label: string }>;

export function Acquisition() {
  const navigate = useNavigate();
  const [flowOpen, setFlowOpen] = useState(false);
  const result = useAppStore((state) => state.result);
  const profile = useAppStore((state) => state.profile);
  const mode = useAppStore((state) => state.acquisitionMode);
  const downPayment = useAppStore((state) => state.downPayment);
  const term = useAppStore((state) => state.term);
  const setMode = useAppStore((state) => state.setAcquisitionMode);
  const setDownPayment = useAppStore((state) => state.setDownPayment);
  const setTerm = useAppStore((state) => state.setTerm);
  const scenario = useAppStore((state) => state.currentScenario());

  if (!result || !profile || !scenario) {
    return (
      <EmptyState
        title="Simulação indisponível"
        text="O diagnóstico libera a simulação de aquisição."
        actionLabel="Fazer diagnóstico"
        to="/diagnostico"
      />
    );
  }

  const systemPrice = FinancialEngine.systemPrice(result.kit);
  const maxDownPayment =
    mode === "social"
      ? Math.round(systemPrice * ECOVOLTS_CONFIG.financial.socialMaxCoparticipationRate)
      : Math.round(systemPrice * ECOVOLTS_CONFIG.financial.commonMaxDownPaymentRate);
  const socialEligible = profile.cadunico === "Sim";

  return (
    <div className="grid">
      <div className="section-header">
        <span className="eyebrow">Simular aquisição</span>
        <h1>Seu plano</h1>
        <p>{result.kit.name}</p>
      </div>

      <Card tone="strong">
        <div className="grid grid--4">
          <MetricCard label="Preço demonstrativo" value={formatCurrency(systemPrice)} />
          <MetricCard label="Economia conservadora" value={`${formatCurrency(result.conservativeSaving)}/mês`} />
          <MetricCard label="Prazo" value={`${scenario.months} meses`} />
          <MetricCard label="Parcela simulada" value={formatCurrency(scenario.installment)} />
        </div>
      </Card>

      <Card>
        <h2>Como você prefere simular?</h2>
        <Tabs tabs={modeTabs} value={mode} onChange={setMode} />

        {mode === "avista" ? (
          <div className="grid grid--3">
            <MetricCard label={result.kit.name} value={formatCurrency(systemPrice)} />
            <MetricCard label="Inclui" value="Sistema + instalação" detail="Monitoramento e EcoVolts Care" />
            <MetricCard label="Contrato" value="Não realizado" detail="Apenas demonstração" />
          </div>
        ) : (
          <div className="grid grid--2">
            <div className="range-wrap">
              <label className="field">
                <span>Quanto deseja dar de entrada?</span>
                <input
                  type="range"
                  min="0"
                  max={maxDownPayment}
                  step="100"
                  value={Math.min(downPayment, maxDownPayment)}
                  onChange={(event) => setDownPayment(Number(event.target.value))}
                />
              </label>
              <strong>{formatCurrency(Math.min(downPayment, maxDownPayment))}</strong>
            </div>
            <div>
              <span className="field">
                <span>Escolha o prazo</span>
              </span>
              <div className="tabs">
                {ECOVOLTS_CONFIG.financial.allowedTerms.map((month) => (
                  <button
                    key={month}
                    type="button"
                    className={month === term ? "is-active" : ""}
                    onClick={() => setTerm(month)}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>

      <div className="grid grid--3">
        <MetricCard label="Valor do plano" value={formatCurrency(scenario.systemPrice)} />
        <MetricCard label="Entrada" value={formatCurrency(scenario.downPayment)} />
        <MetricCard label="Valor simulado" value={formatCurrency(scenario.amountToFinance)} />
        <MetricCard label="Limite EcoVolts" value={`${formatCurrency(scenario.maxMonthlyPayment)}/mês`} />
        <MetricCard label="Economia preservada" value={`${formatCurrency(scenario.preserved)}/mês`} />
        <MetricCard label="Apoio demonstrativo" value={formatCurrency(scenario.impactSupport)} />
      </div>

      {mode === "economia" ? (
        <Alert tone={scenario.viable ? "success" : "warning"}>
          {scenario.viable
            ? "Este cenário se encaixa no Pague com Economia."
            : `Este cenário ainda não se encaixa. Parcela necessária: ${formatCurrency(
                scenario.installment,
              )}. Limite EcoVolts: ${formatCurrency(scenario.maxMonthlyPayment)}.`}
        </Alert>
      ) : null}

      {mode === "social" ? (
        <Alert tone={socialEligible ? "success" : "warning"}>
          {socialEligible
            ? "EcoVolts Social disponível para simulação. O apoio exibido não representa benefício aprovado."
            : "Este perfil ainda não indica elegibilidade social. Você pode ajustar a simulação ou comparar planos."}
        </Alert>
      ) : null}

      {mode === "financiamento" ? (
        <Alert tone="info">
          Condições reais dependeriam de um parceiro financeiro e incluiriam taxas e custos aplicáveis.
        </Alert>
      ) : null}

      <Card>
        <h2>Revise sua simulação</h2>
        <div className="grid grid--3">
          <MetricCard label="Plano" value={result.kit.name.replace("EcoVolts ", "")} />
          <MetricCard label="Forma" value={modeTabs.find((tab) => tab.value === mode)?.label} />
          <MetricCard label="Care" value="Incluso" />
        </div>
        <label className="choice">
          <input type="checkbox" defaultChecked />
          Entendo que esta é uma simulação.
        </label>
        <div className="button-row">
          <Button type="button" onClick={() => navigate("/meu-ecovolts/instalacao")}>
            Concluir simulação
          </Button>
          <Button type="button" variant="ghost" onClick={() => setFlowOpen(true)}>
            Entenda o fluxo
          </Button>
          {!scenario.viable ? (
            <Link className="button button--secondary button--md" to="/solucoes">
              Ver plano Essencial
            </Link>
          ) : null}
        </div>
      </Card>

      <Modal open={flowOpen} title="Fluxo da simulação" onClose={() => setFlowOpen(false)}>
        <div className="grid grid--2">
          <MetricCard label="Parceiro financeiro" value="disponibiliza o valor" />
          <MetricCard label="Instaladora" value="instala o sistema" />
          <MetricCard label="Você" value="paga as parcelas" />
          <MetricCard label="EcoVolts" value="conecta e acompanha" />
        </div>
      </Modal>
    </div>
  );
}
