export function Progress({ value }: { value: number }) {
  const safeValue = Math.min(100, Math.max(0, value));
  return (
    <div className="progress" aria-label={`Progresso ${safeValue}%`}>
      <span style={{ width: `${safeValue}%` }} />
    </div>
  );
}
