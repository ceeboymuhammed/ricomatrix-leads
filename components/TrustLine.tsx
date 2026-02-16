type Props = {
  lines: string[];
};

export function TrustLine({ lines }: Props) {
  return (
    <div className="space-y-1 text-xs text-brand-muted">
      {lines.map((l) => (
        <p key={l}>{l}</p>
      ))}
    </div>
  );
}
