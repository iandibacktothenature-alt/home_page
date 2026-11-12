import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[560px] md:h-[min(100vh,760px)] flex items-end md:items-center overflow-hidden bg-foreground-950">
      <img
        src="https://storage.helloreaddy.io/project_files/8adf33d7-51d1-4e5d-be2d-c47a66cbdf47/9ae81131-a665-4320-82e1-2da427ccfc38_compressed_96B76B26-4F00-42ED-BE7A-99A46600CE3A.webp"
        alt="古民家と畑の風景（イメージ）"
        title="I&I古民家ベース アヤナイ 千葉県印西市"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground-950/90 via-foreground-950/60 to-foreground-950/10" />
      <div className="absolute inset-x-0 bottom-0 h-24 md:h-32 hero-fade-bottom" />

      <div className="relative w-full px-4 md:px-12 pb-16 pt-24 md:py-16">
        <div className="max-w-3xl">
          <h1 className="font-heading font-extrabold text-background-50 text-[2.6rem] leading-[1.1] md:text-7xl lg:text-8xl md:leading-[1.05] tracking-tight">
            みんなでつくる
            <br />
            <span className="text-[#d8b554]">みんなの場所</span>
          </h1>

          <div className="mt-6 max-w-xl text-background-100 text-sm md:text-lg leading-relaxed">
            <p>土にふれ、火を囲み、手を動かす。</p>
            <p>大人も子どもも、夢中になれる里の時間。</p>
          </div>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link
              to="/schedule"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4C9E34] hover:bg-[#418a2c] text-[#FFFFFF] px-7 py-4 text-sm md:text-base font-bold whitespace-nowrap cursor-pointer transition-colors shadow-lg shadow-foreground-950/40"
            >
              <span className="w-5 h-5 flex items-center justify-center text-lg"><i className="ri-calendar-2-line" /></span>
              古民家の予定帖
            </Link>
            <Link
              to="/farm"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-background-50/60 text-background-50 hover:bg-background-50/15 px-7 py-4 text-sm md:text-base whitespace-nowrap cursor-pointer transition-colors"
            >
              農園の見学・体験<i className="ri-arrow-right-line" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}