import { Link } from 'react-router-dom';
import { voices } from '@/mocks/site';
import VoiceCard from '@/components/feature/VoiceCard';

export default function Voices() {
  if (voices.length === 0) return null;

  const hasSample = voices.some((v) => v.sample);
  const shown = voices.slice(0, 3);

  return (
    <section id="voices" className="bg-secondary-50 px-4 md:px-8 py-14 md:py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div className="max-w-2xl">
            <p className="text-sm tracking-widest text-accent-600">参加者の声</p>
            <h2 className="mt-3 font-heading text-2xl md:text-3xl font-bold leading-snug text-foreground-950">
              来場者の声
            </h2>
            <p className="mt-4 text-sm text-foreground-700 leading-relaxed">
              農園、季節のイベント、家族撮影会など、どの活動に参加した方の声かを添えて紹介しています。掲載はご本人の許可をいただいた感想のみです。
            </p>
          </div>
          <Link
            to="/voices"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-secondary-300 bg-background-50 hover:bg-secondary-100 text-secondary-900 px-6 py-3 text-sm font-bold whitespace-nowrap cursor-pointer transition-colors shrink-0 self-start md:self-auto"
          >
            全てを見る
            <i className="ri-arrow-right-line" />
          </Link>
        </div>

        <div className="mt-9 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {shown.map((v) => (
            <VoiceCard key={`${v.activity}-${v.text.slice(0, 12)}`} voice={v} />
          ))}
        </div>

        <p className="mt-5 text-xs text-foreground-500 leading-relaxed">
          ご本人の掲載許可がある感想のみを掲載しています。星評価や、確認できていないお名前・写真は掲載しません。
          {hasSample && <span className="block mt-1 text-foreground-400">※現在は確認用のサンプル原稿を表示しています。</span>}
        </p>
      </div>
    </section>
  );
}