export type KitId = "essencial" | "conforto" | "completo" | "personalizado";
export type GoalId = "economia" | "entrada" | "cobertura" | "seguranca";
export type Confidence = "Inicial" | "Média" | "Alta";
export type AcquisitionMode = "economia" | "financiamento" | "avista" | "social";
export type SupportStatus = "Aberta" | "Em análise" | "Concluída";

export interface Kit {
  id: KitId;
  name: string;
  badge: string;
  monthlyGenerationReference: number;
  priceRange: [number, number];
  objective: string;
  features: string[];
}

export interface DiagnosticProfile {
  bill: number;
  kwh: number;
  unknownKwh: boolean;
  residents: number;
  state: string;
  city: string;
  homeType: string;
  ownership: string;
  roof: string;
  shade: string;
  appliances: string[];
  usageTime: string;
  goal: GoalId;
  preference: string;
  cadunico: string;
}

export interface DiagnosticResult {
  kit: Kit;
  generationMin: number;
  generationMax: number;
  reductionMin: number;
  reductionMax: number;
  savingMin: number;
  savingMax: number;
  conservativeSaving: number;
  confidence: Confidence;
  estimatedBillAfter: number;
}

export interface FinancialScenario {
  id: string;
  title: string;
  months: number;
  systemPrice: number;
  downPayment: number;
  impactSupport: number;
  amountToFinance: number;
  installment: number;
  maxMonthlyPayment: number;
  totalBasePayments: number;
  preserved: number;
  needsDownPayment: boolean;
  viable: boolean;
  social: boolean;
  minimumDownPayment?: number;
}

export interface CareMetric {
  month: string;
  expected: number;
  actual: number;
  expectedSaving: number;
  saving: number;
}

export interface SupportRequest {
  id: string;
  category: string;
  description: string;
  createdAt: string;
  status: SupportStatus;
}
