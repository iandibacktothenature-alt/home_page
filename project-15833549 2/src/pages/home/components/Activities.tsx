import { Link } from 'react-router-dom';
import { activities } from '@/mocks/site';

export default function Activities() {
  return (
    <section className="bg-primary-800 text-background-50 px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm tracking-widest text-secondary-300">アヤナイでできること</p>
        <h2 className="mt-3 font-heading text-2xl md:text-4xl font-extrabold tracking-tight">まずは、何をやってみよう？</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {activities.map((a) => (
            <Link key={a.key} to={a.to} className="group rounded-3xl bg-background-50 text-foreground-900 overflow-hidden flex flex-col cursor-pointer hover:-translate-y-1 transition-transform">
              <div className="w-full h-44 md:h-48 overflow-hidden bg-background-200">
                <img
                  src={a.image}
                  alt={a.alt}
                  title={a.alt}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-accent-100 text-accent-700 flex items-center justify-center text-xl shrink-0"><i className={a.icon} /></span>
                  <p className="text-xs text-accent-600 font-bold">{a.label}</p>
                </div>
                <h3 className="mt-3 font-heading text-xl font-bold">{a.title}</h3>
                <p className="mt-3 text-sm text-foreground-600 flex-1">{a.text}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary-700 group-hover:gap-2 transition-all whitespace-nowrap">{a.cta}<i className="ri-arrow-right-line" /></span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 rounded-3xl border border-background-50/25 bg-background-50/5 p-6 md:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-secondary-300 font-bold">地域で活動する事業者の方へ</p>
            <p className="mt-1 font-heading text-lg md:text-xl">古民家で、これからの話を。</p>
            <p className="mt-1 text-sm text-background-200">会場利用や共同企画のご相談は、交流会などを経た個別ヒアリングで承ります。</p>
          </div>
          <Link to="/business" className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary-400 hover:bg-secondary-300 text-foreground-950 px-6 py-3 text-sm font-bold whitespace-nowrap cursor-pointer">
            古民家交流会について<i className="ri-arrow-right-line" />
          </Link>
        </div>
      </div>
    </section>
  );
}