import clsx from 'clsx'
import { useTranslations } from 'next-intl'

function Office({
  name,
  children,
  invert = false,
}: {
  name: string
  children: React.ReactNode
  invert?: boolean
}) {
  return (
    <address
      className={clsx(
        'text-sm not-italic',
        invert ? 'text-neutral-300' : 'text-neutral-600',
      )}
    >
      <strong className={invert ? 'text-white' : 'text-neutral-950'}>
        {name}
      </strong>
      <br />
      {children}
    </address>
  )
}

export function Offices({
  invert = false,
  ...props
}: React.ComponentPropsWithoutRef<'ul'> & { invert?: boolean }) {
  const t = useTranslations('Menu.Office');

  return (
    <ul role="list" {...props}>
      <li>
        <Office name={t('Slovakia')} invert={invert}>
          Komárňanská 77
          <br />
          932 01, Veľký Meder, {t('Slovakia')}
        </Office>
      </li>
    </ul>
  )
}
