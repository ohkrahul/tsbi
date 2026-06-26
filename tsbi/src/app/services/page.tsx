import { redirect } from 'next/navigation';

/* The standalone services listing has been removed — services are now reached
   directly via the Services dropdown in the nav. Any link to /services lands on
   the first service so existing CTAs keep working. */
export default function ServicesPage() {
  redirect('/services/content-production');
}
