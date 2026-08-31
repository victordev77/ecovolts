import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui";
import { useAppStore } from "../store/useAppStore";

export function Demo() {
  const runDemo = useAppStore((state) => state.runDemo);

  useEffect(() => {
    runDemo();
  }, [runDemo]);

  return (
    <section className="page">
      <div className="section-header">
        <span className="eyebrow">Demo</span>
        <h1>Jornada pronta para apresentar.</h1>
        <p>Use os atalhos abaixo para navegar pela experiencia demonstrativa.</p>
      </div>
      <div className="grid grid--3">
        <Card>
          <h2>Resultado</h2>
          <p>Veja o plano recomendado e os números principais.</p>
          <Link className="button button--primary button--md" to="/resultado">
            Abrir resultado
          </Link>
        </Card>
        <Card>
          <h2>Aquisição</h2>
          <p>Compare os cenários de pagamento e economia preservada.</p>
          <Link className="button button--primary button--md" to="/meu-ecovolts/aquisicao">
            Simular aquisição
          </Link>
        </Card>
        <Card>
          <h2>Care</h2>
          <p>Ative a etapa de instalação para abrir o painel de acompanhamento.</p>
          <Link className="button button--primary button--md" to="/meu-ecovolts/instalacao">
            Continuar jornada
          </Link>
        </Card>
      </div>
    </section>
  );
}
