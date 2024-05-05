'use client'

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userLang = navigator.language;
    const langCode = userLang.split('-')[0];

    const supportedLangs = ['en', 'sk', 'hu'];

    const isSupported = supportedLangs.some(supportedLang => userLang.includes(supportedLang));

    if (!isSupported) {
      sessionStorage.setItem('redirected', 'true');
      router.push(`/en${pathname}`);
    } else {
      sessionStorage.setItem('redirected', 'true');
      router.push(`/${langCode}${pathname}`);
    }
  }, [pathname, router]);
  return null;
}
