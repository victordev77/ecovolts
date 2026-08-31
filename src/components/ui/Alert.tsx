import type { ReactNode } from "react";

type AlertTone = "info" | "success" | "warning";

export function Alert({ children, tone = "info" }: { children: ReactNode; tone?: AlertTone }) {
  return <div className={`alert alert--${tone}`}>{children}</div>;
}
