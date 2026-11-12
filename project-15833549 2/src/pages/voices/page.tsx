import PageLayout from '@/components/feature/PageLayout';
import PageHero from '@/components/base/PageHero';
import VoiceCard from '@/components/feature/VoiceCard';
import { Link } from 'react-router-dom';
import { voices } from '@/mocks/site';

export default function VoicesPage() {
  const hasSample = voices.some((v) => v.sample);

  return (
    <PageLayout>
      <PageHero
        label="来場者の声"
        title="来場者の声"
        titleClassName="text-primary-700"
        lines={[
          '畑仕事、季節のイベント、家族撮影会など、',
          'アヤナイに来てくださった方の感想をまとめています。',
        ]}
      />

      <section className="px-4 md:px-8 py-14 md:py-20 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm tracking-widest text-accent-600">VOICES</p>
            <h2 className="mt-3 font-heading text-2xl md:text-3xl font-bold text-foreground-950">
              {voices.length}件の声を掲載しています
            </h2>
            <p className="mt-4 text-sm text-foreground-700 leading-relaxed">
              どの活動に参加した方の声かを添えて紹介しています。掲載はご本人の許可をいただいた感想のみです。
            </p>
          </div>
          <Link
            to="/#voices"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-secondary-300 bg-background-50 hover:bg-secondary-100 text-secondary-900 px-6 py-3 text-sm font-bold whitespace-nowrap cursor-pointer transition-colors shrink-0 self-start md:self-auto"
          >
            <i className="ri-arrow-left-line" />
            トップの紹介へ戻る
          </Link>
        </div>

        <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {voices.map((v) => (
            <VoiceCard key={`${v.activity}-${v.text.slice(0, 12)}`} voice={v} />
          ))}
        </div>

        <p className="mt-6 text-xs text-foreground-500 leading-relaxed">
          ご本人の掲載許可がある感想のみを掲載しています。星評価や、確認できていないお名前・写真は掲載しません。
          {hasSample && <span className="block mt-1 text-foreground-400">※現在は確認用のサンプル原稿を表示しています。</span>}
        </p>
      </section>

      <section className="px-4 md:px-8 pb-16 md:pb-20 max-w-6xl mx-auto">
        <div className="rounded-3xl bg-secondary-50 border border-secondary-200 p-6 md:p-9 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <p className="text-xs font-bold tracking-widest text-accent-600">まずは来てみてください</p>
            <p className="mt-2 font-heading text-xl md:text-2xl font-bold text-foreground-950">
              感想は、来た日から生まれます。
            </p>
            <p className="mt-2 text-sm text-foreground-700">
              見学・体験の日程は予定帖でご確認いただけます。はじめての方は見学からどうぞ。
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/schedule"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 hover:bg-primary-700 text-background-50 px-6 py-3 text-sm font-bold whitespace-nowrap cursor-pointer transition-colors"
            >
              予定帖を見る
              <i className="ri-arrow-right-line" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-background-300 bg-background-50 hover:bg-background-100 text-foreground-800 px-6 py-3 text-sm font-bold whitespace-nowrap cursor-pointer transition-colors"
            >
              お問い合わせ
              <i className="ri-mail-line" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}