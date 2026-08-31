import { NavLink, Outlet } from "react-router-dom";

export function MyEcovoltsLayout() {
  return (
    <section className="app-page">
      <div className="app-shell">
        <aside className="side-nav" aria-label="Menu Meu EcoVolts">
          <div className="side-nav__inner">
            <NavLink end to="/meu-ecovolts">
              Visão geral
            </NavLink>
            <NavLink to="/meu-ecovolts/minha-solucao">Minha solução</NavLink>
            <NavLink to="/meu-ecovolts/aquisicao">Simular aquisição</NavLink>
            <NavLink to="/meu-ecovolts/instalacao">Instalação</NavLink>
            <NavLink to="/meu-ecovolts/care">EcoVolts Care</NavLink>
            <NavLink to="/meu-ecovolts/suporte">Suporte</NavLink>
          </div>
        </aside>
        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
