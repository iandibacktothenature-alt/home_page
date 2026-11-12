import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageLayout from '@/components/feature/PageLayout';
import Hero from './components/Hero';
import Notices from './components/Notices';
import ScheduleSection from './components/ScheduleSection';
import Concept from './components/Concept';
import Activities from './components/Activities';
import Records from './components/Records';
import Voices from './components/Voices';
import PlaceAccess from './components/PlaceAccess';
import NoteBanner from './components/NoteBanner';
import AccessSection from './components/AccessSection';
import ContactLine from './components/ContactLine';

export default function Home() {
  const { hash } = useLocation();

  // フッターやお知らせから #access / #contact へ移動したときに、該当の欄までスクロール
  useEffect(() => {
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    if (target) {
      window.requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  }, [hash]);

  return (
    <PageLayout>
      <Hero />
      <Notices />
      <ScheduleSection />
      <Concept />
      <Activities />
      <Records />
      <Voices />
      <PlaceAccess />
      <NoteBanner />
      <AccessSection />
      <ContactLine />
    </PageLayout>
  );
}