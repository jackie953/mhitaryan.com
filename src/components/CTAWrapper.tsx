import { usePathname } from 'next/navigation';
import { InteractiveCta } from './interactive-cta';
import { useTranslations } from 'next-intl';

export function CTAWrapper() {
  const pathname = usePathname();
  const t = useTranslations('HomePage');

  // Don't show CTA on contact page
  if (pathname === '/contact' || pathname?.includes('/contact')) {
    return null;
  }

  return (
    <InteractiveCta
      heading="Want to discuss a project?"
      subheading="Let's talk"
    />
  );
}
