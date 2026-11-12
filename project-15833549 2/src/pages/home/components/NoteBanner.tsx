import { externalLinks } from '@/mocks/site';

export default function NoteBanner() {
  if (!externalLinks.note) return null;

  return (
    <section id="note" className="bg-background-50 px-4 md:px-8 py-14 md:py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-primary-200 bg-gradient-to-br from-primary-200 via-primary-100 to-primary-50 text-primary-900">
          <div className="absolute inset-0 pattern-dots-dark opacity-70" aria-hidden="true" />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-6 md:p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-800 text-primary-50 px-3 py-1 font-en text-[11px]">
                <span className="w-3.5 h-3.5 flex items-center justify-center"><i className="ri-booklet-line" /></span>
                Diary
              </span>
              <h2 className="mt-4 font-heading text-2xl md:text-4xl font-extrabold leading-snug text-primary-900">
                古民家の日記帖
              </h2>
              <p className="mt-3 text-sm md:text-base text-primary-800/85 leading-relaxed max-w-xl">
                畑のようす、焚き火の夜、手しごとの記録。日々の小さな変化を、noteで綴っています。企画の背景を知りたい方は、こちらからどうぞ。
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <a
                  href={externalLinks.note}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-800 hover:bg-primary-900 text-background-50 px-7 py-3.5 text-sm font-bold whitespace-nowrap cursor-pointer transition-colors"
                >
                  noteで日記帖を読む
                  <i className="ri-external-link-line" />
                </a>
                <span className="inline-flex items-center gap-1.5 text-xs text-primary-800/70">
                  <span className="w-4 h-4 flex items-center justify-center"><i className="ri-refresh-line" /></span>
                  更新はゆっくり、気ままに。
                </span>
              </div>
            </div>
            <div className="lg:col-span-5 h-56 lg:h-full min-h-[220px]">
              <img
                src="https://storage.helloreaddy.io/project_files/8adf33d7-51d1-4e5d-be2d-c47a66cbdf47/9ee86b28-9cde-441d-a1a1-99b482af8d8b_compressed_IMG_2655.webp"
                alt="日記帖を開いた机の風景（イメージ）"
                title="古民家の日記帖｜I&I古民家ベース アヤナイ"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}