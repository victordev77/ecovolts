import { Link } from "react-router-dom";
import { ECOVOLTS_CONFIG } from "../config/ecovolts.config";
import { Card } from "../components/ui";
import { formatRange } from "../utils/format";

export function Solutions() {
  return (
    <section className="page">
      <div className="section-header">
        <span className="eyebrow">Soluções</span>
        <h1>Escolha um plano para simular.</h1>
        <p>Cada faixa é demonstrativa. A configuração real depende de vistoria e validação técnica.</p>
      </div>
      <div className="grid grid--2">
        {Object.values(ECOVOLTS_CONFIG.kits).map((kit) => (
          <Card key={kit.id}>
            <div className="split-head">
              <div>
                <span className="badge badge--info">{kit.badge}</span>
                <h2>{kit.name}</h2>
              </div>
              <strong>{formatRange(kit.priceRange[0], kit.priceRange[1])}</strong>
            </div>
            <p>{kit.objective}</p>
            <ul>
              {kit.features.slice(0, 4).map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="button-row">
              <Link className="button button--secondary button--md" to="/diagnostico">
                Ver plano
              </Link>
              <Link className="button button--primary button--md" to="/demo">
                Simular
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
