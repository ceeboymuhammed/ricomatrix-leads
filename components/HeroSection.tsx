type Props = {
  headline: string;
  subheadline: string;
  bullets: string[];
  microTrustLine?: string;
};

export function HeroSection({ headline, subheadline, bullets, microTrustLine }: Props) {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
        {headline}
      </h1>

      <p className="text-base leading-relaxed text-brand-muted md:text-lg">
        {subheadline}
      </p>

      <ul className="space-y-2 pt-2">
        {bullets.map((b) => (
          <li key={b} className="flex gap-3 text-sm text-white/90 md:text-base">
            <span className="mt-2 h-2 w-2 flex-none rounded-full bg-brand-gold" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {microTrustLine ? (
        <p className="pt-2 text-sm text-brand-muted">
          {microTrustLine}
        </p>
      ) : null}
    </section>
  );
}
