import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import ecovoltsSymbol from "../assets/ecovolts-symbol-nav.png";
import { ThemeToggle } from "../components/ThemeToggle";

export function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  const closeMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.hash, location.pathname]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 769px)");
    const closeOnDesktop = () => {
      if (media.matches) {
        setMobileMenuOpen(false);
      }
    };

    closeOnDesktop();
    media.addEventListener("change", closeOnDesktop);

    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) return;

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="shell">
      <header className="topbar">
        <div className="topbar__inner">
          <NavLink className="brand" to="/" onClick={closeMenu}>
            <span className="brand__mark" aria-hidden="true">
              <img src={ecovoltsSymbol} alt="" width="240" height="160" decoding="async" />
            </span>
            <span>EcoVolts</span>
          </NavLink>

          <div className="topbar__actions">
            <ThemeToggle className="theme-toggle--desktop" />

            <button
              type="button"
              className="topbar__toggle"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-controls="mobile-navigation"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              <span className="topbar__toggle-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>

          <nav className="nav" aria-label="Principal">
            <NavLink to="/" end>
              Início
            </NavLink>
            <NavLink to="/solucoes">
              Soluções
            </NavLink>
            <NavLink to="/diagnostico">
              Diagnóstico
            </NavLink>
            <NavLink to="/meu-ecovolts">
              Meu EcoVolts
            </NavLink>
            <NavLink to="/apoie">
              Apoie
            </NavLink>
            <NavLink to="/demo">
              Demo
            </NavLink>
            <ThemeToggle className="theme-toggle--nav" />
          </nav>
        </div>

        <div className="notice-bar">Protótipo demonstrativo. Nenhuma compra ou contratação real é realizada.</div>
      </header>
      <div
        className={`mobile-overlay ${mobileMenuOpen ? "mobile-overlay--open" : ""}`}
        aria-hidden="true"
        onClick={closeMenu}
      />
      <aside
        id="mobile-navigation"
        ref={drawerRef}
        className={`mobile-drawer ${mobileMenuOpen ? "mobile-drawer--open" : ""}`}
        aria-hidden={!mobileMenuOpen}
        tabIndex={-1}
      >
        <div className="mobile-drawer__header">
          <NavLink className="brand" to="/" onClick={closeMenu}>
            <span className="brand__mark" aria-hidden="true">
              <img src={ecovoltsSymbol} alt="" width="240" height="160" decoding="async" />
            </span>
            <span>EcoVolts</span>
          </NavLink>
          <button type="button" className="mobile-drawer__close" aria-label="Fechar menu" onClick={closeMenu}>
            X
          </button>
        </div>

        <nav className="mobile-drawer__nav" aria-label="Menu mobile">
          <NavLink to="/" end onClick={closeMenu}>
            Início
          </NavLink>
          <NavLink to="/diagnostico" onClick={closeMenu}>
            Diagnóstico
          </NavLink>
          <NavLink to="/solucoes" onClick={closeMenu}>
            Soluções
          </NavLink>
          <a href="/#como-funciona" onClick={closeMenu}>
            Como funciona
          </a>
          <a href="/#impacto" onClick={closeMenu}>
            Impacto
          </a>
          <a href="/#sobre" onClick={closeMenu}>
            Sobre
          </a>
          <NavLink to="/meu-ecovolts" onClick={closeMenu}>
            Meu EcoVolts
          </NavLink>
          <NavLink to="/apoie" onClick={closeMenu}>
            Apoie
          </NavLink>
          <NavLink to="/demo" onClick={closeMenu}>
            Demo
          </NavLink>
        </nav>

        <div className="mobile-drawer__footer">
          <ThemeToggle className="theme-toggle--mobile" />
          <NavLink className="button button--primary button--md mobile-drawer__cta" to="/diagnostico" onClick={closeMenu}>
            Descobrir meu plano
          </NavLink>
        </div>
      </aside>
      <main>
        <Outlet />
      </main>
      <footer className="footer" id="sobre">
        <div>EcoVolts 2.0. Valores simulados, sujeitos à validação técnica em uma operação real.</div>
      </footer>
    </div>
  );
}
