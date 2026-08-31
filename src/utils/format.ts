export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);

export const formatKwh = (value: number) => `${Math.round(value)} kWh`;

export const formatRange = (min: number, max: number, suffix = "") => `${formatCurrency(min)}-${formatCurrency(max)}${suffix}`;

export const money = formatCurrency;

export const range = (min: number, max: number, suffix = "") => `${Math.round(min)}-${Math.round(max)}${suffix}`;
