import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Alert, Button, Card, EmptyState, MetricCard } from "../components/ui";
import { ECOVOLTS_CONFIG } from "../config/ecovolts.config";
import { useAppStore } from "../store/useAppStore";
import { formatCurrency, formatKwh } from "../utils/format";

export function Care() {
  const result = useAppStore((state) => state.result);
  const careActive = useAppStore((state) => state.careActive);
  const careAlert = useAppStore((state) => state.careAlert);
  const toggleCareAlert = useAppStore((state) => state.toggleCareAlert);
  const metrics = useAppStore((state) => state.careMetrics());

  if (!result || !careActive) {
    return (
      <EmptyState
        title="EcoVolts Care aguarda ativação"
        text="Simule as etapas de instalação para abrir o acompanhamento."
        actionLabel="Abrir instalação"
        to="/meu-ecovolts/instalacao"
      />
    );
  }

  const current = metrics[metrics.length - 1] ?? metrics[0];
  const totalSaving = metrics.reduce((sum, item) => sum + item.saving, 0);
  const expectedLow = Math.round(result.generationMin * 0.92);
  const expectedHigh = Math.round(result.generationMax * 1.03);
  const actualGeneration = careAlert ? Math.round(current.actual * 0.77) : current.actual;

  return (
    <div className="grid">
      <div className="split-head">
        <div className="section-header">
          <span className="eyebrow">EcoVolts Care</span>
          <h1>Bom dia.</h1>
          <p>Seu sistema está funcionando normalmente.</p>
        </div>
        <Button type="button" variant="secondary" onClick={toggleCareAlert}>
          {careAlert ? "Ver status normal" : "Simular alerta"}
        </Button>
      </div>

      <div className="grid grid--4">
        <MetricCard label="Geração hoje" value="12,8 kWh" />
        <MetricCard label="Este mês" value={formatKwh(actualGeneration)} />
        <MetricCard label="Economia estimada" value={formatCurrency(current.saving)} />
        <MetricCard label="Economia acumulada" value={formatCurrency(totalSaving)} />
      </div>

      <Alert tone={careAlert ? "warning" : "success"}>
        {careAlert
          ? `Geração abaixo do esperado. Esperado: ${expectedLow}-${expectedHigh} kWh. Registrado: ${actualGeneration} kWh.`
          : `Geração dentro do esperado. Esperado: ${expectedLow}-${expectedHigh} kWh. Realizado: ${actualGeneration} kWh.`}
      </Alert>

      <div className="grid grid--2">
        <Card>
          <h2>Geração</h2>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics}>
                <CartesianGrid stroke="#dce6dd" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="expected" name="Esperado" fill="#9fbda8" />
                <Bar dataKey="actual" name="Realizado" fill="#19684b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <h2>Economia</h2>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics}>
                <CartesianGrid stroke="#dce6dd" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="saving" name="Economia" stroke="#c37b25" strokeWidth={3} />
                <Line type="monotone" dataKey="expectedSaving" name="Esperado" stroke="#285f91" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {careAlert ? (
        <Card>
          <h2>Possíveis causas</h2>
          <p>Sombra temporária, sujeira nos módulos, falha de conexão ou variação climática.</p>
          <div className="button-row">
            <Button type="button" variant="secondary">
              Ver possíveis causas
            </Button>
            <a className="button button--primary button--md" href="/meu-ecovolts/suporte">
              Solicitar assistência
            </a>
          </div>
        </Card>
      ) : null}

      <Card tone="quiet">
        <div className="grid grid--3">
          <MetricCard label="Saude" value="Normal" />
          <MetricCard label="Plano" value={result.kit.name.replace("EcoVolts ", "")} />
          <MetricCard label="CO2 evitado" value={`${Math.round(current.actual * ECOVOLTS_CONFIG.care.co2KgPerKwh)} kg`} />
        </div>
      </Card>
    </div>
  );
}
