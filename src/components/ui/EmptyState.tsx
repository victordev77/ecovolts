import { Link } from "react-router-dom";

export function EmptyState({
  title,
  text,
  actionLabel,
  to,
}: {
  title: string;
  text: string;
  actionLabel: string;
  to: string;
}) {
  return (
    <section className="empty-state">
      <h1>{title}</h1>
      <p>{text}</p>
      <Link className="button button--primary button--md" to={to}>
        {actionLabel}
      </Link>
    </section>
  );
}
