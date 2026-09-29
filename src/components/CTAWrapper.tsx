import { usePathname } from 'next/navigation';
import { InteractiveCta } from './interactive-cta';

export function CTAWrapper() {
  const pathname = usePathname();

  // Don't show CTA on contact page
  if (pathname === '/contact' || pathname?.includes('/contact')) {
    return null;
  }

  return <InteractiveCta />;
}
