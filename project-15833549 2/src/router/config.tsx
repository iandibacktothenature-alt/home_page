import type { RouteObject } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/home/page';
import Farm from '@/pages/farm/page';
import Schedule from '@/pages/schedule/page';
import Contact from '@/pages/contact/page';
import VoicesPage from '@/pages/voices/page';
import ComingSoon from '@/pages/coming-soon/page';

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/farm', element: <Farm /> },
  { path: '/schedule', element: <Schedule /> },
  { path: '/photo', element: <ComingSoon label="撮影会" title="季節の家族撮影会" lines={['古民家と畑で、季節の家族写真を。']} /> },
  { path: '/business', element: <ComingSoon label="事業者交流会" title="事業者交流会" lines={['地域で活動する事業者が、思いや得意を知り合う場です。']} /> },
  { path: '/about', element: <ComingSoon label="アヤナイについて" title="アヤナイについて" lines={['運営者・アクセス・よくあるご質問']} /> },
  { path: '/voices', element: <VoicesPage /> },
  { path: '/contact', element: <Contact /> },
  { path: '*', element: <NotFound /> },
];

export default routes;