import { Metadata } from 'next'
import { RootLayout } from '@/components/RootLayout'
import { NextIntlClientProvider, useMessages } from 'next-intl'

import '@/styles/tailwind.css'

type LayoutProps = {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export const metadata: Metadata = {
  title: {
    template: '%s - Studio',
    default: 'Studio - Award winning developer studio based in Denmark',
  },
}

export default function Layout({ children, params: { locale } }: LayoutProps) {
  const messages = useMessages()

  return (
    <html lang={locale} className="h-full bg-neutral-950 text-base antialiased">
      <body className="flex min-h-full flex-col">
      <NextIntlClientProvider messages={messages}>
        <RootLayout>
            {children}
        </RootLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
