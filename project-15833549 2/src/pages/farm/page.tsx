import PageLayout from '@/components/feature/PageLayout';
import PageHero from '@/components/base/PageHero';
import ApplyButton from '@/components/base/ApplyButton';
import { applyLinks } from '@/mocks/site';
import MonthGuide from './components/MonthGuide';

const rules: { text: string; icon: boolean }[] = [
  { text: '共用農具あり（作業着・靴は各自でご用意ください）', icon: true },
  { text: '農薬・除草剤・化学肥料は原則禁止', icon: true },
  { text: '種・苗の持参大歓迎', icon: true },
  { text: '敷地の天然資材を活用', icon: true },
  { text: '共同の苗場・採種、月例会での相談', icon: true },
  { text: '手入れの助け合い', icon: true },
];

const steps = ['見学・体験', '利用条件の確認', '申込み・契約', '利用開始'];

export default function Farm() {
  return (
    <PageLayout>
      <PageHero label="農園" title="みんなの家庭菜園場" titleClassName="text-primary-700" lines={['古民家の畑で、自然農の個人区画を。', '初めての方も、見学・体験から始められます。']} />
      <section className="px-4 md:px-8 py-14 md:py-20 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-background-200 p-6 md:p-8">
          <h2 className="font-heading text-2xl font-bold">区画と料金</h2>
          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between border-b border-background-200 pb-3"><dt className="text-foreground-500">区画</dt><dd className="font-bold">3m×3m（9㎡）</dd></div>
            <div className="flex justify-between border-b border-background-200 pb-3"><dt className="text-foreground-500">月額</dt><dd className="font-bold text-lg text-primary-700 whitespace-nowrap">5,000円／1区画</dd></div>
            <div className="flex justify-between border-b border-background-200 pb-3"><dt className="text-foreground-500">初回契約</dt><dd className="font-bold">6か月（合計30,000円）</dd></div>
          </dl>
          <p className="mt-5 text-sm text-foreground-600">毎月1日にカード決済し、その月の末日までご利用いただけます。初回6か月の満了後は、1か月単位で自動延長します。解約・返却・返金の詳細は規約に従います。</p>
        </div>
        <div className="rounded-2xl bg-background-100 p-6 md:p-8">
          <h2 className="font-heading text-2xl font-bold">畑の約束ごと</h2>
          <ul className="mt-6 space-y-3 text-sm">
            {rules.map((r) => (
              <li key={r.text} className="flex gap-3">{r.icon && <span className="w-5 h-5 flex items-center justify-center text-primary-600 shrink-0"><i className="ri-checkbox-circle-line" /></span>}{r.text}</li>
            ))}
          </ul>
        </div>
      </section>
      <MonthGuide />
      <section className="px-4 md:px-8 py-14 md:py-20 max-w-5xl mx-auto">
        <h2 className="font-heading text-2xl md:text-3xl font-bold">はじめるまでの流れ</h2>
        <ol className="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-3">
          {steps.map((s, i) => (
            <li key={s} className="rounded-xl bg-secondary-100 p-5">
              <span className="text-xs font-bold text-secondary-700">STEP {i + 1}</span>
              <p className="mt-1 font-heading font-bold text-lg">{s}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <ApplyButton url={applyLinks.farmVisit} label="農園見学" />
        </div>
      </section>
    </PageLayout>
  );
}