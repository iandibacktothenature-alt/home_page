import { useState } from 'react';
import { farmMonths } from '@/mocks/site';

export default function MonthGuide() {
  const [sel, setSel] = useState(new Date().getMonth() + 1);
  const cur = farmMonths[sel - 1];
  const next = Array.from({ length: 6 }, (_, i) => farmMonths[(sel - 1 + i) % 12]);

  return (
    <section className="px-4 md:px-8 py-16 md:py-20 bg-background-100">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm tracking-widest text-accent-600">月別作業ガイド</p>
        <h2 className="mt-3 font-heading text-2xl md:text-3xl font-bold">何月から始めても、畑はつながっています</h2>
        <p className="mt-3 text-sm text-foreground-600">始めたい月を選ぶと、その月の作業例と、そこから半年の目安が表示されます。</p>
        <div className="hidden" aria-hidden="true">
          {farmMonths.map((f) => (
            <img key={f.m} src={f.img} alt="" />
          ))}
        </div>
        <div className="mt-8 grid grid-cols-6 md:grid-cols-12 gap-2" role="tablist" aria-label="開始月を選ぶ">
          {farmMonths.map((f) => (
            <button
              key={f.m}
              type="button"
              role="tab"
              aria-selected={sel === f.m}
              onMouseEnter={() => setSel(f.m)}
              onFocus={() => setSel(f.m)}
              onClick={() => setSel(f.m)}
              className={`h-11 rounded-lg text-sm font-bold whitespace-nowrap cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 ${
                sel === f.m ? 'bg-primary-600 text-background-50' : 'bg-background-50 text-foreground-700 hover:bg-primary-100'
              }`}
            >
              {f.m}月
            </button>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-5" role="tabpanel">
          <div className="lg:col-span-2 rounded-2xl bg-primary-700 text-background-50 overflow-hidden flex flex-col">
            <div className="relative w-full aspect-[8/5] shrink-0">
              <img
                key={cur.m}
                src={cur.img}
                alt={`${cur.m}月の畑の風景`}
                title={`${cur.m}月の畑の風景 里づくり・畑仕事`}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-700 via-primary-700/20 to-transparent" />
              <p className="absolute left-5 bottom-2 font-heading text-4xl font-extrabold drop-shadow-sm">
                {cur.m}<span className="text-lg ml-1">月</span>
              </p>
            </div>
            <div className="p-6 pt-4">
              <h3 className="text-xs text-secondary-200 font-bold">作業例</h3>
              <p className="mt-1">{cur.work}</p>
              <h3 className="mt-4 text-xs text-secondary-200 font-bold">体験例</h3>
              <p className="mt-1">{cur.exp}</p>
            </div>
          </div>
          <ol className="lg:col-span-3 rounded-2xl bg-background-50 border border-background-200 p-6 space-y-3">
            <li className="text-xs text-foreground-500 font-bold">{cur.m}月スタートの半年の目安</li>
            {next.map((f, i) => (
              <li key={f.m} className="flex gap-4 text-sm">
                <span className="w-12 shrink-0 font-bold text-accent-600">{i === 0 ? '開始' : `${i + 1}か月`}</span>
                <span className="w-10 shrink-0 font-bold">{f.m}月</span>
                <span className="text-foreground-700">{f.work}</span>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-4 text-xs text-foreground-500">※作業例は季節の目安です。天候や区画の状態により変わり、収穫や空き区画を確約するものではありません。開催日は予定帖をご覧ください。</p>
      </div>
    </section>
  );
}