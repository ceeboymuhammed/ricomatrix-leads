type Props = {
  title: string;
  youtubeUrl?: string;
  autoPlay?: boolean;
};

function toYouTubeEmbed(url: string) {
  try {
    const u = new URL(url);

    // https://youtu.be/VIDEO_ID
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}`;
    }

    // https://www.youtube.com/watch?v=VIDEO_ID
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    // ignore
  }

  return null;
}

export function VideoPlaceholder({ title, youtubeUrl, autoPlay = true }: Props) {
  const baseEmbed = youtubeUrl ? toYouTubeEmbed(youtubeUrl) : null;

  // Autoplay requires mute on most browsers
  const embed =
    baseEmbed && autoPlay
      ? `${baseEmbed}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`
      : baseEmbed;

  return (
    <div className="rounded-xl2 border border-brand-border bg-brand-surface p-4 shadow-soft">
      <div className="flex items-center justify-between gap-2">
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="text-xs text-brand-muted">Auto-plays muted</div>
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-black/40">
        {embed ? (
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full"
              src={embed}
              title={title}
              allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="aspect-video grid w-full place-items-center">
            <div className="text-sm text-white/80">Video Placeholder</div>
          </div>
        )}
      </div>

      <p className="mt-2 text-xs text-brand-muted">
        (Autoplay is muted by default for compatibility.)
      </p>
    </div>
  );
}
