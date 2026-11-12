interface Props {
  label: string;
  title: string;
  lines: string[];
  titleClassName?: string;
}

export default function PageHero({ label, title, lines, titleClassName = 'text-foreground-950' }: Props) {
  return (
    <section className="bg-background-100 border-b border-background-200 pattern-dots-dark">
      <div className="px-4 md:px-8 py-14 md:py-20 max-w-5xl mx-auto">
        <span className="block h-1 w-10 rounded-full bg-accent-500" aria-hidden="true" />
        <p className="mt-4 text-xs md:text-sm tracking-widest text-accent-700 font-label">{label}</p>
        <h1 className={`mt-3 font-heading text-3xl md:text-5xl font-extrabold tracking-tight leading-tight ${titleClassName}`}>{title}</h1>
        <div className="mt-5 text-foreground-700 text-sm md:text-base">
          {lines.map((l) => <p key={l}>{l}</p>)}
        </div>
      </div>
    </section>
  );
}