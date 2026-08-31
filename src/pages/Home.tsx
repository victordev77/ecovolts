import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ECOVOLTS_CONFIG } from "../config/ecovolts.config";
import { FinancialEngine } from "../engines";
import { Card, MetricCard } from "../components/ui";
import { formatCurrency, formatRange } from "../utils/format";

export function Home() {
  const plan = ECOVOLTS_CONFIG.kits.conforto;
  const price = FinancialEngine.systemPrice(plan);

  return (
    <div className="page">
      <section className="hero">
        <div className="hero__copy">
          <span className="eyebrow">Energia solar residencial</span>
          <h1>Energia renovável que cabe no seu bolso.</h1>
          <p>Descubra a solução solar ideal para sua casa, veja quanto você pode economizar e simule como começar.</p>
          <div className="hero__actions">
            <Link className="button button--primary button--md" to="/diagnostico">
              Descobrir meu plano
            </Link>
            <Link className="button button--secondary button--md" to="/solucoes">
              Conhecer soluções
            </Link>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div className="product-panel">
            <div className="product-panel__head">
              <div>
                <span className="eyebrow">Seu potencial</span>
                <h2>Diagnóstico rápido</h2>
              </div>
              <span className="demo-note">Exemplo demonstrativo.</span>
            </div>
            <div className="grid grid--2">
              <MetricCard label="Conta atual" value={formatCurrency(320)} />
              <MetricCard label="Plano recomendado" value="Conforto" />
              <MetricCard label="Economia estimada" value="R$ 170-195/mês" />
              <MetricCard label="Preço demonstrativo" value={formatCurrency(price)} />
            </div>
            <Link className="button button--primary button--md" to="/demo">
              Ver diagnóstico
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="section" id="beneficios">
        <div className="section-header">
          <span className="eyebrow">Benefícios</span>
          <h2>Da conta de luz ao acompanhamento mensal.</h2>
        </div>
        <div className="grid grid--3">
          <Card>
            <h3>Entenda</h3>
            <p>Descubra qual solução combina com sua casa.</p>
          </Card>
          <Card>
            <h3>Economize</h3>
            <p>Veja o potencial de redução dos seus gastos.</p>
          </Card>
          <Card>
            <h3>Acompanhe</h3>
            <p>Monitore geração e desempenho depois da instalação.</p>
          </Card>
        </div>
        <div className="actions">
          <Link className="button button--primary button--md" to="/diagnostico">
            Começar diagnóstico
          </Link>
        </div>
      </section>

      <section className="section" id="como-funciona">
        <div className="section-header">
          <span className="eyebrow">Como funciona</span>
          <h2>Quatro passos para simular sua jornada.</h2>
        </div>
        <div className="grid grid--4">
          {["Conte sobre sua casa", "Receba seu plano", "Simule sua aquisição", "Acompanhe pelo EcoVolts Care"].map(
            (step, index) => (
              <Card key={step} tone="quiet">
                <span className="eyebrow">{index + 1}</span>
                <h3>{step}</h3>
              </Card>
            ),
          )}
        </div>
      </section>

      <section className="section" id="solucoes">
        <div className="section-header">
          <span className="eyebrow">Soluções</span>
          <h2>Planos para diferentes realidades.</h2>
        </div>
        <div className="grid grid--4">
          {Object.values(ECOVOLTS_CONFIG.kits).map((kit) => (
            <Card key={kit.id}>
              <span className="badge badge--info">{kit.badge}</span>
              <h3>{kit.name}</h3>
              <p>{kit.objective}</p>
              <p>{formatRange(kit.priceRange[0], kit.priceRange[1])}</p>
              <Link className="button button--secondary button--sm" to="/solucoes">
                Ver plano
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="section grid grid--3" id="impacto">
        <Card tone="strong">
          <h2>Pague com Economia</h2>
          <p>Veja se parte da economia estimada pode ajudar a viabilizar seu plano.</p>
          <Link className="button button--primary button--md" to="/meu-ecovolts/aquisicao">
            Simular
          </Link>
        </Card>
        <Card>
          <h2>EcoVolts Social</h2>
          <p>Cenários demonstrativos para famílias elegíveis e projetos com parceiros.</p>
          <Link className="button button--secondary button--md" to="/diagnostico">
            Ver elegibilidade
          </Link>
        </Card>
        <Card>
          <h2>EcoVolts Care</h2>
          <p>Acompanhe geração, economia e alertas depois da ativação.</p>
          <Link className="button button--secondary button--md" to="/demo">
            Abrir demo
          </Link>
        </Card>
      </section>

      <section className="section section--compact">
        <Card tone="strong" className="split-head">
          <div>
            <span className="eyebrow">Comece agora</span>
            <h2>Vamos encontrar o plano ideal para sua casa.</h2>
          </div>
          <Link className="button button--primary button--md" to="/diagnostico">
            Descobrir meu plano
          </Link>
        </Card>
      </section>
    </div>
  );
}
