import { EmptyState } from "../components/ui";

export function NotFound() {
  return (
    <EmptyState
      title="Página não encontrada"
      text="Volte para o início ou continue pela jornada demonstrativa."
      actionLabel="Ir para o início"
      to="/"
    />
  );
}
