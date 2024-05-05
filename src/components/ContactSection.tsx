import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl';


export function ContactSection() {
  const t = useTranslations('Contact-section');

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn className="-mx-6 rounded-4xl bg-neutral-950 px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-medium text-white [text-wrap:balance] sm:text-4xl">
              {t('Title')}
            </h2>
            <div className="mt-6 flex">
              <Link href="/contact" className='inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition bg-white text-neutral-950 hover:ring-1 hover:ring-neutral-200 hover:bg-transparent hover:text-neutral-200'>
                {t('Hej')}
              </Link>
            </div>
            <div className="mt-10 border-t border-white/10 pt-10">
              <h3 className="font-display text-base font-semibold text-white">
                {t('Office')}
              </h3>
              <Offices
                invert
                className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2"
              />
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
