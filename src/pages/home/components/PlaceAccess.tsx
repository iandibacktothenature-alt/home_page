import { Link } from 'react-router-dom';

const places = [
  { icon: 'ri-home-4-line', title: '古民家', text: '季節の行事や食の場になる、活動の拠点です。' },
  { icon: 'ri-leaf-line', title: '広場', text: '手仕事や語り、撮影会の舞台になります。' },
  { icon: 'ri-plant-line', title: '畑', text: '自然農の個人区画と共同の苗場があります。' },
];

export default function PlaceAccess() {
  return (
    <section className="px-4 md:px-8 py-16 md:py-24 bg-background-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3">
          <p className="text-sm tracking-widest text-accent-600">施設のご案内</p>
          <h2 className="mt-3 font-heading text-2xl md:text-3xl font-bold">古民家・広場・畑が、活動の場です</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {places.map((p) => (
              <div key={p.title} className="rounded-xl bg-background-50 p-5 border border-background-200">
                <div className="w-10 h-10 flex items-center justify-center text-2xl text-primary-600"><i className={p.icon} /></div>
                <h3 className="mt-2 font-heading font-bold">{p.title}</h3>
                <p className="mt-1 text-sm text-foreground-600">{p.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-foreground-500">来場時の設備は、確認が取れたものから各企画でご案内します。</p>
        </div>
        <div className="lg:col-span-2 rounded-2xl bg-foreground-950 text-background-100 p-6 md:p-8">
          <h2 className="font-heading text-xl font-bold text-background-50">場所と日程のご案内</h2>
          <p className="mt-4 flex items-center gap-2"><span className="w-5 h-5 flex items-center justify-center"><i className="ri-map-pin-line" /></span>千葉県印西市鹿黒296</p>
          <p className="mt-3 text-sm text-background-300">詳しい所在地・集合場所・駐車場は、お申込みの企画ごとにご案内します。千葉ニュータウン中央駅・木下駅からの送迎は、対応する企画に限りお知らせします。</p>
          <div className="mt-6 flex flex-col gap-3">
            <Link to="/#access" className="text-center rounded-full bg-accent-500 hover:bg-accent-600 text-foreground-950 py-3 text-sm font-bold whitespace-nowrap cursor-pointer transition-colors">アクセス・駐車場を見る</Link>
          </div>
        </div>
      </div>
    </section>
  );
}