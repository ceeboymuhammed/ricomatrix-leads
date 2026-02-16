import Image from "next/image";

export function TopBar() {
  return (
    <header className="border-b border-brand-border">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-brand-surface ring-1 ring-brand-border shadow-soft">
            <Image
              src="/logo.png"
              alt="Ricomatrix"
              fill
              className="object-contain p-1"
              priority
            />
          </div>

          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide">Ricomatrix</div>
            <div className="text-xs text-brand-muted">Premium Growth</div>
          </div>
        </div>

        <div className="text-xs text-brand-muted">
          <span className="rounded-full border border-brand-border bg-brand-surface px-3 py-1">
            Data Protected
          </span>
        </div>
      </div>
    </header>
  );
}
