"use client"
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const router = useRouter();
    const t = useTranslations('Not-found');

    const handleGoBack = () => {
      const wasRedirected = sessionStorage.getItem('redirected') === 'true';
      sessionStorage.removeItem('redirected');
      if (window.history.length > 3) {
         window.history.go(-2);
      } else if (window.history.length > 2 && wasRedirected) {
         router.push('/');
      } else if (window.history.length > 2) {
         router.back();
      } else {
         router.push('/');
      }
     };     
     
  return (
    <Container className="flex h-full items-center pt-24 sm:pt-32 lg:pt-40">
      <FadeIn className="flex max-w-xl flex-col items-center text-center">
        <p className="font-display text-4xl font-semibold text-neutral-950 sm:text-5xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-neutral-950">
          {t('Title')}
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
        {t('Subtitle')}
        </p>
        <div className="flex flex-row">
        <Link
          href="/"
          className="mt-4 text-sm font-semibold text-neutral-950 transition hover:text-neutral-700 mr-4"
        >
          {t('Go-home')}
        </Link>
        <button
          type="button" 
          onClick={handleGoBack}
          className='mt-4 text-sm font-semibold text-neutral-950 transition hover:text-neutral-700 ml-4'>
        {t('Go-back')}
      </button>
        </div>
      </FadeIn>
    </Container>
  )
}
