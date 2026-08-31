import type { DiagnosticProfile, GoalId, Kit } from "../types";

export const ECOVOLTS_CONFIG = {
  storageKey: "ecovolts_react_state",
  tariffByState: { Ceará: 0.9, Pernambuco: 0.88, Bahia: 0.86, "São Paulo": 0.92, Outro: 0.89 },
  conservativeMargin: 0.88,
  pricingStatus: "demonstrativo",
  simulation: {
    minimumEstimatedKwh: 120,
    maximumCoverageRatio: 0.92,
    generationRangeLow: 0.92,
    generationRangeHigh: 1.05,
    minimumGeneration: 80,
    reductionCapLow: 82,
    reductionCapHigh: 88,
    minimumPostSolarBill: 35,
    cearaLocationFactor: 1.05,
    defaultLocationFactor: 0.98
  },
  recommendation: {
    lowBill: 190,
    lowConsumptionKwh: 210,
    highConsumptionKwh: 430
  },
  financial: {
    maxSavingsCommitment: 0.7,
    allowedTerms: [36, 48, 60, 72, 84],
    includeInterestInDemo: false,
    commonMaxDownPaymentRate: 0.45,
    socialMaxCoparticipationRate: 0.25,
    socialImpactSupportRate: 0.35
  },
  care: {
    co2KgPerKwh: 0.07,
    monthlyFactors: [0.96, 1.02, 0.99, 1.03, 0.98, 1.01],
    months: ["Mar", "Abr", "Mai", "Jun", "Jul", "Ago"]
  },
  factors: {
    shade: { Pouco: 1, Médio: 0.9, Muito: 0.76, "Não sei": 0.86 },
    roof: { Telhado: 1, Laje: 0.96, Terreno: 0.94, "Não sei": 0.88 },
    usageTime: { Manhã: 0.97, Tarde: 1, Noite: 0.91, Distribuído: 0.96, "Não sei": 0.92 }
  },
  appliances: ["Iluminação", "Geladeira", "Ventiladores", "Televisão", "Computador", "Máquina de lavar", "Ar-condicionado", "Outros"],
  goals: [
    { id: "economia", title: "Economizar", text: "Reduzir meus gastos mensais." },
    { id: "entrada", title: "Começar menor", text: "Ter uma solução de entrada." },
    { id: "cobertura", title: "Maior cobertura", text: "Atender uma parcela maior do consumo." },
    { id: "seguranca", title: "Segurança energética", text: "Manter equipamentos durante interrupções." }
  ] satisfies Array<{ id: GoalId; title: string; text: string }>,
  kits: {
    essencial: {
      id: "essencial",
      name: "EcoVolts Essencial",
      badge: "Entrada acessível",
      monthlyGenerationReference: 220,
      priceRange: [7600, 9000],
      objective: "Entrada acessível na energia solar.",
      features: ["Menor geração mensal de referência", "Menor investimento", "Conectado à rede", "Sem bateria por padrão", "Expansível quando tecnicamente possível", "Care incluso"]
    },
    conforto: {
      id: "conforto",
      name: "EcoVolts Conforto",
      badge: "Mais recomendado",
      monthlyGenerationReference: 310,
      priceRange: [15800, 20500],
      objective: "Equilíbrio entre investimento e economia.",
      features: ["Geração mensal de referência intermediária", "Maior cobertura do consumo", "Conectado à rede", "Sem bateria por padrão", "Modular", "Care incluso"]
    },
    completo: {
      id: "completo",
      name: "EcoVolts Completo",
      badge: "Economia + backup",
      monthlyGenerationReference: 460,
      priceRange: [32800, 46500],
      objective: "Economia com segurança energética.",
      features: ["Maior geração mensal de referência", "Inversor híbrido", "Armazenamento", "Backup de cargas selecionadas", "Monitoramento", "Maior investimento", "Care incluso"]
    },
    personalizado: {
      id: "personalizado",
      name: "EcoVolts Personalizado",
      badge: "Configuração preliminar",
      monthlyGenerationReference: 360,
      priceRange: [21000, 42000],
      objective: "Configuração preliminar personalizada.",
      features: ["Geração mensal alvo ajustável", "Armazenamento opcional", "Objetivo configurável", "Expansão planejada", "Validação profissional obrigatória"]
    }
  } satisfies Record<string, Kit>,
  demoProfile: {
    bill: 280,
    kwh: 310,
    unknownKwh: false,
    residents: 4,
    state: "Ceará",
    city: "Irauçuba",
    homeType: "Casa",
    ownership: "Próprio",
    roof: "Telhado",
    shade: "Pouco",
    appliances: ["Iluminação", "Geladeira", "Ventiladores", "Televisão", "Máquina de lavar"],
    usageTime: "Distribuído",
    goal: "economia",
    preference: "Pague com Economia",
    cadunico: "Sim"
  } satisfies DiagnosticProfile
};
