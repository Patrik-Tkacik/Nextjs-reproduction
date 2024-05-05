import { Link } from '@/navigation'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import { socialMediaProfiles } from '@/components/SocialMedia'
import {useTranslations} from 'next-intl';
import { LanguageSelector } from './LanguageSwitcher'


function Navigation() {
  
  const t = useTranslations('Footer');
  const tc = useTranslations('Footer.Company');

  const navigation = [
    {
      title: t('Work'),
      links: [
        { title: 'FamilyFund', href: '/work/family-fund' },
        { title: 'Unseal', href: '/work/unseal' },
        { title: 'Phobia', href: '/work/phobia' },
        {
          title: (
            <>
              {t('See-all')} <span aria-hidden="true">&rarr;</span>
            </>
          ),
          href: '/work',
        },
      ],
    },
    {
      title: tc('Company'),
      links: [
        { title: tc('About'), href: '/about' },
        { title: tc('Process'), href: '/process' },
        { title: tc('Blog'), href: '/blog' },
        { title: tc('Contact-us'), href: '/contact' },
      ],
    },
    {
      title: t('Connect'),
      links: socialMediaProfiles,
    },
  ];
  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {navigation.map((section, sectionIndex) => (
          <li key={sectionIndex}>
            <div className="font-display text-sm font-semibold tracking-wider text-neutral-950">
              {section.title}
            </div>
            <ul role="list" className="mt-4 text-sm text-neutral-700">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="mt-4">
                  <Link
                    href={link.href}
                    className="transition hover:text-neutral-950"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  )
}

function NewsletterForm() {
  const t = useTranslations('Footer.Email');

  return (
    <form className="max-w-sm">
      <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
        {t('Title')}
      </h2>
      <p className="mt-4 text-sm text-neutral-700">
      {t('Subtitle')}
      </p>
      <div className="relative mt-6">
        <input
          type="email"
          placeholder={t('Email-address')}
          autoComplete="email"
          aria-label="Email address"
          className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            type="submit"
            aria-label="Submit"
            className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
          >
            <ArrowIcon className="w-4" />
          </button>
        </div>
      </div>
    </form>
  )
}

export function Footer() {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <Navigation />
          <div className="flex flex-col sm:flex-row lg:justify-end sm:items-end">
            <NewsletterForm />
            <LanguageSelector bottom={false} dark={false} className='block lg:hidden sm:w-1/2 sm:h-1/2 sm:ml-4 -mb-10 mt-8 sm:mt-0' />
          </div>
        </div>
        <div className="mb-20 mt-24 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
          <Link href="/" aria-label="Home">
            <Logo className="h-8" fillOnHover />
          </Link>
          <div className='flex flex-row justify-center items-center'>
          <p className="text-sm text-neutral-700 mr-8">
            © Studio Agency Inc. {new Date().getFullYear()}
          </p>
          <LanguageSelector bottom={false} dark={false} className='hidden lg:block' />
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
