import { useState } from "react";
import { motion } from "framer-motion";
import { Alert, Button, Card, Input, MetricCard, Modal, Select } from "../components/ui";
import { EcovoltsSeal } from "../components/EcovoltsSeal";

type Currency = "BRL" | "EUR" | "USD";
type Frequency = "once" | "monthly";

interface CurrencyConfig {
  code: Currency;
  symbol: string;
  label: string;
  values: number[];
  defaultVal: number;
}

const currencies: Record<Currency, CurrencyConfig> = {
  BRL: {
    code: "BRL",
    symbol: "R$",
    label: "BRL — Real (R$)",
    values: [10, 25, 50, 100, 250, 500],
    defaultVal: 50,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    label: "EUR — Euro (€)",
    values: [5, 10, 25, 50, 100, 250],
    defaultVal: 25,
  },
  USD: {
    code: "USD",
    symbol: "$",
    label: "USD — Dólar (US$)",
    values: [5, 10, 25, 50, 100, 250],
    defaultVal: 25,
  },
};

interface RecentActivityItem {
  id: string;
  text: string;
  timeAgo: string;
}

const initialActivities: RecentActivityItem[] = [
  { id: "1", text: "Apoiador anônimo simulou uma contribuição de R$ 50.", timeAgo: "há 2 horas" },
  { id: "2", text: "Empresa Parceira demonstrou interesse no Selo EcoVolts.", timeAgo: "há 5 horas" },
  { id: "3", text: "Apoiador anônimo simulou uma contribuição de € 10.", timeAgo: "há 1 dia" },
  { id: "4", text: "Nova empresa demonstrativa iniciou uma parceria.", timeAgo: "há 2 dias" },
];

export function SupportProject() {
  const [frequency, setFrequency] = useState<Frequency>("once");
  const [currency, setCurrency] = useState<Currency>("BRL");
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);

  // Contribution Modal State
  const [contribModalOpen, setContribModalOpen] = useState<boolean>(false);
  const [donorName, setDonorName] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [isPublicDonor, setIsPublicDonor] = useState<boolean>(true);
  const [contribSuccess, setContribSuccess] = useState<boolean>(false);

  // Partner Modal State
  const [partnerModalOpen, setPartnerModalOpen] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>("");
  const [contactName, setContactName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [interestType, setInterestType] = useState<string>("Parceria institucional");
  const [partnerSuccess, setPartnerSuccess] = useState<boolean>(false);

  // Dynamic Recent Activity
  const [activities, setActivities] = useState<RecentActivityItem[]>(initialActivities);

  const activeCurrency = currencies[currency];

  const handleCurrencyChange = (newCurr: Currency) => {
    setCurrency(newCurr);
    setSelectedAmount(currencies[newCurr].defaultVal);
    setIsCustom(false);
    setCustomAmount("");
  };

  const currentAmountDisplay = isCustom
    ? Number(customAmount) || 0
    : selectedAmount;

  const handleOpenContribModal = () => {
    setContribSuccess(false);
    setContribModalOpen(true);
  };

  const handleConfirmContrib = (e: React.FormEvent) => {
    e.preventDefault();
    setContribSuccess(true);

    const displayName = isPublicDonor && donorName.trim() ? donorName.trim() : "Apoiador anônimo";
    const freqText = frequency === "monthly" ? "mensal" : "";
    const newText = `${displayName} simulou uma contribuição ${freqText} de ${activeCurrency.symbol} ${currentAmountDisplay}.`.replace(/\s+/g, " ");

    setActivities((prev) => [
      { id: crypto.randomUUID(), text: newText, timeAgo: "agora mesmo" },
      ...prev,
    ]);
  };

  const handleConfirmPartner = (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerSuccess(true);

    const compDisplay = companyName.trim() || "Empresa Parceira";
    const newText = `${compDisplay} demonstrou interesse no Selo EcoVolts.`;

    setActivities((prev) => [
      { id: crypto.randomUUID(), text: newText, timeAgo: "agora mesmo" },
      ...prev,
    ]);
  };

  return (
    <div className="page page--support">
      {/* HERO SECTION */}
      <section className="hero hero--support">
        <div className="hero__copy">
          <span className="eyebrow">Apoie o EcoVolts</span>
          <h1>Ajude a levar energia renovável mais longe.</h1>
          <p>
            Seu apoio pode ajudar a EcoVolts a desenvolver soluções, fortalecer o EcoVolts Social e ampliar o acesso de famílias de baixa renda à energia solar.
          </p>
          <div className="hero__actions">
            <a href="#simular-contribuicao" className="button button--primary button--md">
              Simular uma contribuição
            </a>
            <a href="#nosso-impacto" className="button button--secondary button--md">
              Conhecer o impacto
            </a>
          </div>
          <p className="demo-disclaimer-subtle">
            Protótipo demonstrativo. Nenhuma cobrança ou doação real é realizada.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="support-hero-badge-card card--strong">
            <div className="support-hero-badge-card__inner">
              <div className="support-hero-badge-card__icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12A10 10 0 0 1 12 2z"/>
                  <path d="M12 22V12"/>
                  <path d="M12 12c4 0 7-3 7-7"/>
                </svg>
              </div>
              <div>
                <h3>Impacto Socioambiental</h3>
                <p>Democratizando o acesso à energia limpa para quem mais precisa.</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* SIMULADOR DE CONTRIBUIÇÃO */}
      <section id="simular-contribuicao" className="section">
        <Card className="contrib-simulator-card">
          <div className="section-header" style={{ marginBottom: 18 }}>
            <span className="eyebrow">Simulador</span>
            <h2>Faça uma contribuição</h2>
            <p>Selecione a frequência, a moeda e o valor que deseja simular.</p>
          </div>

          <div className="contrib-simulator__controls">
            {/* Frequency Selector */}
            <div className="tabs tabs--frequency" role="tablist" aria-label="Frequência da contribuição">
              <button
                type="button"
                role="tab"
                aria-selected={frequency === "once"}
                className={frequency === "once" ? "is-active" : ""}
                onClick={() => setFrequency("once")}
              >
                Uma vez
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={frequency === "monthly"}
                className={frequency === "monthly" ? "is-active" : ""}
                onClick={() => setFrequency("monthly")}
              >
                Mensal
              </button>
            </div>

            {/* Currency Selector */}
            <div className="field currency-select-field">
              <label htmlFor="currency-select" className="sr-only">Selecione a moeda</label>
              <select
                id="currency-select"
                value={currency}
                onChange={(e) => handleCurrencyChange(e.target.value as Currency)}
              >
                {Object.values(currencies).map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Preset Values Grid */}
          <div className="contrib-grid" role="group" aria-label="Sugestões de valores">
            {activeCurrency.values.map((val) => (
              <button
                key={val}
                type="button"
                className={`contrib-grid__btn ${!isCustom && selectedAmount === val ? "is-selected" : ""}`}
                onClick={() => {
                  setSelectedAmount(val);
                  setIsCustom(false);
                }}
              >
                {activeCurrency.symbol} {val}
              </button>
            ))}
            <button
              type="button"
              className={`contrib-grid__btn ${isCustom ? "is-selected" : ""}`}
              onClick={() => setIsCustom(true)}
            >
              Outro valor
            </button>
          </div>

          {/* Custom Amount Input */}
          {isCustom && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="custom-amount-wrap"
            >
              <div className="field">
                <span>Informe o valor desejado ({activeCurrency.symbol})</span>
                <div className="custom-amount-input">
                  <span className="custom-amount-symbol">{activeCurrency.symbol}</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="0"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div className="contrib-simulator__action">
            <Button
              type="button"
              variant="primary"
              size="md"
              disabled={isCustom && (!customAmount || Number(customAmount) <= 0)}
              onClick={handleOpenContribModal}
            >
              Simular contribuição ({activeCurrency.symbol} {currentAmountDisplay} {frequency === "monthly" ? "/mês" : ""})
            </Button>
            <span className="demo-disclaimer-subtle">
              Sem cobrança real. Protótipo demonstrativo.
            </span>
          </div>
        </Card>
      </section>

      {/* TRANSPARÊNCIA: PARA ONDE IRIA O APOIO? */}
      <section className="section">
        <div className="section-header">
          <span className="eyebrow">Transparência</span>
          <h2>Para onde iria o seu apoio?</h2>
          <p>Veja como as contribuições seriam distribuídas para impulsionar o projeto EcoVolts.</p>
        </div>

        <div className="grid grid--3">
          <Card>
            <h3>EcoVolts Social</h3>
            <p>Apoio direto e instalação simplificada para famílias de baixa renda.</p>
          </Card>
          <Card>
            <h3>Projetos-piloto</h3>
            <p>Testes e expansão de novas soluções modulares de energia solar.</p>
          </Card>
          <Card>
            <h3>Desenvolvimento da plataforma</h3>
            <p>Manutenção técnica, infraestrutura de software e novos recursos.</p>
          </Card>
          <Card>
            <h3>Suporte e acompanhamento</h3>
            <p>Assistência contínua às famílias e monitoramento pelo EcoVolts Care.</p>
          </Card>
          <Card>
            <h3>Educação energética</h3>
            <p>Conteúdos acessíveis sobre consumo consciente e economia sustentável.</p>
          </Card>
        </div>
        <p className="demo-disclaimer-subtle" style={{ marginTop: 12 }}>
          Distribuição ilustrativa para demonstração do modelo.
        </p>
      </section>

      {/* NOSSO IMPACTO */}
      <section id="nosso-impacto" className="section">
        <div className="section-header">
          <span className="eyebrow">Resultados demonstrativos</span>
          <h2>Nosso impacto</h2>
        </div>

        <div className="grid grid--4">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <MetricCard label="Contribuições simuladas" value="1.420" detail="Apoiadores individuais" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <MetricCard label="Apoiadores simulados" value="380" detail="Pessoas engajadas" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <MetricCard label="Empresas parceiras" value="24" detail="Parceiros de impacto" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <MetricCard label="Famílias potencialmente beneficiadas" value="1.150" detail="Estimativa social" />
          </motion.div>
        </div>

        <Alert tone="info" style={{ marginTop: 16 }}>
          Dados demonstrativos utilizados para representar um possível cenário de funcionamento da plataforma.
        </Alert>
      </section>

      {/* ATIVIDADE RECENTE */}
      <section className="section">
        <div className="section-header">
          <span className="eyebrow">Transparência em tempo real</span>
          <h2>Atividade recente</h2>
        </div>

        <Card>
          <ul className="recent-activity-list">
            {activities.map((act) => (
              <li key={act.id} className="recent-activity-item">
                <span className="recent-activity-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </span>
                <div className="recent-activity-content">
                  <span className="recent-activity-text">{act.text}</span>
                  <span className="recent-activity-time">{act.timeAgo}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="demo-disclaimer-subtle" style={{ marginTop: 14 }}>
            Atividade demonstrativa do protótipo.
          </p>
        </Card>
      </section>

      {/* SELO ECOVOLTS & EMPRESAS */}
      <section className="section section--partner">
        <Card tone="strong" className="partner-card">
          <div className="partner-card__grid">
            <div className="partner-card__info">
              <span className="eyebrow">Para empresas</span>
              <h2>Seja um parceiro de impacto.</h2>
              <p>
                Empresas que colaboram com o EcoVolts ajudam a ampliar o acesso à energia renovável e podem receber o Selo EcoVolts, um reconhecimento institucional pelo apoio às iniciativas de impacto social do projeto.
              </p>
              
              <div className="partner-benefits">
                <h3>Por que se tornar um parceiro?</h3>
                <ul>
                  <li>✓ Reconhecimento público</li>
                  <li>✓ Associação a iniciativas de impacto socioambiental</li>
                  <li>✓ Fortalecimento institucional da marca</li>
                  <li>✓ Transparência sobre a colaboração</li>
                  <li>✓ Participação em uma rede de parceiros EcoVolts</li>
                </ul>
              </div>

              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => {
                  setPartnerSuccess(false);
                  setPartnerModalOpen(true);
                }}
              >
                Quero ser parceiro EcoVolts
              </Button>
            </div>

            <div className="partner-card__seal-container">
              <EcovoltsSeal size={220} />
              <p className="seal-disclaimer">
                O Selo EcoVolts é um reconhecimento institucional da própria EcoVolts pelo apoio às iniciativas do projeto. Não representa certificação governamental, ambiental ou ESG.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* MODAL CONTRIBUIÇÃO SIMULADA */}
      <Modal
        open={contribModalOpen}
        title={contribSuccess ? "Contribuição Confirmada!" : "Confirmar contribuição"}
        onClose={() => setContribModalOpen(false)}
      >
        {!contribSuccess ? (
          <form className="grid" onSubmit={handleConfirmContrib}>
            <div className="metric-card" style={{ background: "var(--surface-muted)" }}>
              <span>Resumo da contribuição</span>
              <strong>{activeCurrency.symbol} {currentAmountDisplay}</strong>
              <small>Frequência: {frequency === "monthly" ? "Mensal" : "Uma vez"} ({activeCurrency.code})</small>
            </div>

            <Input
              label="Seu nome (opcional)"
              placeholder="Ex: Maria Silva ou deixe em branco para anônimo"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
            />

            <Input
              label="E-mail demonstrativo"
              type="email"
              placeholder="seuemail@exemplo.com"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
            />

            <label className="choice">
              <input
                type="checkbox"
                checked={isPublicDonor}
                onChange={(e) => setIsPublicDonor(e.target.checked)}
              />
              <span>
                Quero aparecer como apoiador público
                <small>Caso desmarcado, você aparecerá como Apoiador Anônimo.</small>
              </span>
            </label>

            <Alert tone="warning">
              Esta é uma simulação. Nenhum valor monetário será cobrado do seu cartão ou conta.
            </Alert>

            <div className="button-row">
              <Button type="submit" variant="primary">
                Confirmar contribuição simulada
              </Button>
              <Button type="button" variant="ghost" onClick={() => setContribModalOpen(false)}>
                Cancelar
              </Button>
            </div>
          </form>
        ) : (
          <div className="grid" style={{ textAlign: "center", padding: "10px 0" }}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <div style={{ margin: "0 auto 12px", width: 56, height: 56, borderRadius: "50%", background: "var(--surface-strong)", display: "grid", placeItems: "center" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
              <h3>Obrigado por apoiar o EcoVolts!</h3>
              <p style={{ marginTop: 8 }}>
                Esta foi uma contribuição simulada. Nenhum valor foi cobrado.
              </p>
            </motion.div>

            <Alert tone="success">
              Sua simulação foi registrada e adicionada à seção de atividade recente desta sessão.
            </Alert>

            <Button type="button" variant="primary" onClick={() => setContribModalOpen(false)}>
              Continuar
            </Button>
          </div>
        )}
      </Modal>

      {/* MODAL FORMULÁRIO DE PARCERIA EMPRESARIAL */}
      <Modal
        open={partnerModalOpen}
        title={partnerSuccess ? "Interesse Registrado!" : "Seja um parceiro de impacto"}
        onClose={() => setPartnerModalOpen(false)}
      >
        {!partnerSuccess ? (
          <form className="grid" onSubmit={handleConfirmPartner}>
            <Input
              label="Nome da empresa"
              placeholder="Ex: Soluções Sustentáveis Ltda"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />

            <Input
              label="Nome do responsável"
              placeholder="Ex: Carlos Andrade"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />

            <Input
              label="E-mail corporativo"
              type="email"
              placeholder="contato@empresa.com"
              required
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />

            <Input
              label="Telefone / WhatsApp"
              type="tel"
              placeholder="(11) 99999-9999"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
            />

            <Select
              label="Tipo de interesse"
              value={interestType}
              onChange={(e) => setInterestType(e.target.value)}
            >
              <option value="Apoio financeiro">Apoio financeiro</option>
              <option value="Parceria institucional">Parceria institucional</option>
              <option value="Apoio ao EcoVolts Social">Apoio ao EcoVolts Social</option>
              <option value="Fornecimento/instalação">Fornecimento/instalação</option>
              <option value="Outro">Outro</option>
            </Select>

            <Alert tone="info">
              Cadastro demonstrativo de parceria. Não gera obrigações contratuais ou financeiras.
            </Alert>

            <div className="button-row">
              <Button type="submit" variant="primary">
                Enviar interesse
              </Button>
              <Button type="button" variant="ghost" onClick={() => setPartnerModalOpen(false)}>
                Cancelar
              </Button>
            </div>
          </form>
        ) : (
          <div className="grid" style={{ textAlign: "center", padding: "10px 0" }}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <div style={{ margin: "0 auto 12px", width: 56, height: 56, borderRadius: "50%", background: "var(--surface-strong)", display: "grid", placeItems: "center" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
              <h3>Interesse registrado com sucesso!</h3>
              <p style={{ marginTop: 8 }}>
                Obrigado pelo interesse da <strong>{companyName || "sua empresa"}</strong> em ser um parceiro de impacto EcoVolts.
              </p>
            </motion.div>

            <Alert tone="success">
              Demonstração enviada. A atividade de parceria foi adicionada ao painel do protótipo.
            </Alert>

            <Button type="button" variant="primary" onClick={() => setPartnerModalOpen(false)}>
              Concluir
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
