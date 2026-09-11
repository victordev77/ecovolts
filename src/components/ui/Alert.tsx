import type { CSSProperties, ReactNode } from "react";

type AlertTone = "info" | "success" | "warning";

export function Alert({
  children,
  tone = "info",
  className = "",
  style,
}: {
  children: ReactNode;
  tone?: AlertTone;
  className?: string;
  style?: CSSProperties;
}) {
  return <div className={`alert alert--${tone} ${className}`} style={style}>{children}</div>;
}
