const pillars = [
  {
    icon: 'ri-seedling-line',
    title: '自然農',
    text: '農薬・化学肥料に頼らず、敷地の資材を活かした農法から循環を学びます。',
    tone: 'bg-primary-100 text-primary-700 group-hover:bg-primary-500',
  },
  {
    icon: 'ri-bowl-line',
    title: '伝統食',
    text: '季節の食を仕込み、食卓を囲む。受け継がれてきた知恵を暮らしに戻します。',
    tone: 'bg-accent-100 text-accent-700 group-hover:bg-accent-500',
  },
  {
    icon: 'ri-hand-heart-line',
    title: '助け合い',
    text: '得意を持ち寄り、助け合う。地域の人と人がつながる場をつくります。',
    tone: 'bg-secondary-100 text-secondary-800 group-hover:bg-secondary-400',
  },
];

export default function Concept() {
  return (
    <section className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div>
          <p className="text-sm tracking-widest text-accent-600">アヤナイの想い</p>
          <h2 className="mt-3 font-heading text-2xl md:text-4xl font-extrabold leading-snug tracking-tight text-foreground-950">
            暮らしを自分たちの手で。<br />文化を、子どもたちへ。
          </h2>
        </div>
        <div className="text-foreground-700 leading-loose space-y-4">
          <p>千葉県印西市の古民家と畑を舞台に、自然農や伝統食、地域の助け合いを通じて、暮らしを自分たちでつくる経験を重ねています。</p>
          <p>人が得意を持ち寄り、季節の行事を一緒に営む。そんな「みんなの場所」を、関わる人みんなで育てています。</p>
          <p className="text-sm text-foreground-500">I&amp;I には「私と私」という意味があります。</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {pillars.map((p) => (
          <article
            key={p.title}
            className="group rounded-3xl bg-background-100 border border-background-200 overflow-hidden flex flex-col hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg hover:shadow-foreground-950/5 transition-all duration-300"
          >
            <div className="p-6 md:p-7 flex-1 flex flex-col">
              <span
                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shrink-0 transition-colors duration-300 group-hover:text-background-50 ${p.tone}`}
              >
                <i className={p.icon} />
              </span>
              <h3 className="mt-5 font-heading text-xl md:text-2xl font-bold text-foreground-950">{p.title}</h3>
              <p className="mt-3 text-sm text-foreground-600 leading-relaxed">{p.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}