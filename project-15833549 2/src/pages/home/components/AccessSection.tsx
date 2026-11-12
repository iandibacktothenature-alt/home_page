import { Link } from 'react-router-dom';
import { externalLinks } from '@/mocks/site';

const details = [
  { icon: 'ri-map-pin-line', label: '所在地', text: '千葉県印西市鹿黒296' },
  { icon: 'ri-route-line', label: 'アクセス', text: '千葉ニュータウン中央駅・木下駅/各車8分・バス15分〜' },
  { icon: 'ri-parking-line', label: '駐車場', text: '15〜30台分' },
  { icon: 'ri-bus-2-line', label: '送迎', text: '対応が決まった企画のみご案内します' },
];

export default function AccessSection() {
  return (
    <section id="access" className="bg-foreground-950 text-background-100 px-4 md:px-8 py-14 md:py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <div>
          <p className="text-sm tracking-widest text-secondary-300">アクセス・駐車場</p>
          <h2 className="mt-3 font-heading text-2xl md:text-3xl font-bold text-background-50 leading-snug">
            アクセス・駐車場について
          </h2>
          <p className="mt-5 text-sm md:text-base text-background-200 leading-loose">
            I&amp;I古民家ベース（アヤナイ）は千葉県印西市にあります。詳しい場所や集合場所、駐車場のご利用については、各企画の案内をご確認ください。ご不明な点は公式LINEへお問い合わせください。
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            {externalLinks.line && (
              <a
                href={externalLinks.line}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-500 hover:bg-primary-600 text-background-50 px-6 py-3 text-sm font-bold whitespace-nowrap cursor-pointer transition-colors"
              >
                <span className="w-5 h-5 flex items-center justify-center text-lg"><i className="ri-line-fill" /></span>
                公式LINEでアクセスを問い合わせる
              </a>
            )}
            <Link
              to="/schedule"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-background-500 hover:bg-background-50/10 text-background-100 px-6 py-3 text-sm whitespace-nowrap cursor-pointer transition-colors"
            >
              予定帖で企画を見る<i className="ri-arrow-right-line" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {details.map((d) => (
            <div key={d.label} className="rounded-2xl border border-background-700 bg-background-50/5 p-5">
              <span className="w-9 h-9 flex items-center justify-center rounded-full bg-background-50/10 text-lg text-secondary-200">
                <i className={d.icon} />
              </span>
              <p className="mt-3 text-xs tracking-wider text-secondary-300">{d.label}</p>
              <p className="mt-1 text-sm text-background-100 leading-relaxed">{d.text}</p>
            </div>
          ))}
          <p className="sm:col-span-2 text-xs text-background-400 leading-relaxed">
            地図・入口・駐車台数の詳細は、公開範囲と内容を運営者が確認したうえで追記します。送迎は、対応が決まった企画の案内でのみお知らせします。
          </p>
        </div>
      </div>
    </section>
  );
}