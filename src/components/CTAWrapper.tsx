'use client';
import { IconMail, IconCalendar } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import InteractiveCTA from './interactive-cta';
import { openContactEmail } from '@/utils/contact-email';

export default function CTAWrapper() {
  const pathname = usePathname();
  const showCTA = !['/contact'].includes(pathname);
  if (!showCTA) return null;

  return (
    <InteractiveCTA
      heading="Want to discuss a project?"
      subheading=""
      initialOpen={false}
      openWidth="250px"
      openHeight="130px"
      navigationLinks={[
        {
          onClick: openContactEmail,
          text: 'Email',
          icon: <IconMail size={14} />,
          className:
            'px-2 py-1 text-white/70 hover:text-[#2563EB] font-body',
        },
        {
          href: 'https://cal.com/mhitaryan',
          text: 'Book a call',
          icon: <IconCalendar size={14} />,
          className:
            'px-2 py-1 text-white/70 hover:text-[#8B5CF6] font-body',
          target: '_blank',
        },
      ]}
    />
  );
}
