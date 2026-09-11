import ecovoltsSealImg from "../assets/ecovolts-seal.png";

export function EcovoltsSeal({ size = 240 }: { size?: number }) {
  return (
    <div
      className="ecovolts-seal"
      style={{ width: size, maxWidth: "100%", height: "auto", aspectRatio: "1/1" }}
      role="img"
      aria-label="Selo EcoVolts — Parceiro de Impacto"
    >
      <img
        src={ecovoltsSealImg}
        alt="Selo EcoVolts — Parceiro de Impacto"
        className="ecovolts-seal__img"
      />
    </div>
  );
}
