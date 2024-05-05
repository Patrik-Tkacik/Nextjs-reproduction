'use client'
import { useState, useRef, Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { usePathname, Link } from '@/navigation'
import { usePathname as usePathnameNext } from 'next/navigation'
import Image from 'next/image'
import clsx from 'clsx';

const languages = [
  { ISO: 'en', label: 'English' },
  { ISO: 'sk', label: 'Slovenčina' },
  { ISO: 'hu', label: 'Magyar' },
]

type LanguageSelectorProps = {
  className?: string;
  bottom?: boolean;
  dark: boolean;
};

export function LanguageSelector({ className, bottom, dark }: LanguageSelectorProps) {
  const currentLocale = usePathnameNext()
  const pathSegments = currentLocale.split('/')

  function getLanguageISO () {
    const firstSegment = pathSegments[1]
    const matchedLanguage =
      languages.find((lang) => lang.ISO === firstSegment) || languages[0]
    return matchedLanguage
  }

  const [selected, setSelected] = useState(() => getLanguageISO())

  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const optionsRef = useRef<HTMLDivElement | null>(null)
  const pathname = usePathname()

  return (
<div className={clsx('w-52', className)}>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button
            ref={buttonRef}
            className={`w-full rounded-lg border-[1px] border-solid ${dark ? "border-[#2E2E2E] bg-[#232323] hover:bg-[#3B3B3B] ui-open:bg-[#3B3B3B]" : "border-[#e9ecef] bg-[#f8f9fa] hover:bg-[#e9eaea] ui-open:bg-[#e9eaea]"} py-2 transition-colors duration-150 px-3 md:px-4`}
          >
            <div className="flex cursor-pointer flex-row ">
              <Image
                className=""
                height={22}
                width={22}
                src={`/${selected.ISO}.svg`}
                alt={selected.label}
              />
              <span className={`${dark ? "text-gray-200" : "text-gray-900"} flex h-full w-full items-center pl-2.5 text-sm font-semibold`}>
                {selected.label}
              </span>
            </div>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="ui-open:rotate-180 h-5 w-5 transform text-gray-500 transition-transform duration-200"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition ease-in duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              ref={optionsRef}
              className={`absolute max-h-60 w-full overflow-auto rounded-lg border-[1px] border-solid ${dark ? "border-[#2E2E2E] bg-[#232323]" : "border-[#e9ecef] bg-[#f8f9fa]"} p-1.5 ${bottom? 'top-full mt-1' : 'bottom-full mb-1'}`}
            >
              {languages.map((language, languageIdx) => (
                <Link href={pathname} locale={language.ISO} key={languageIdx}>
                  <Listbox.Option
                    key={languageIdx}
                    className={({ active }) =>
                      `relative cursor-pointer select-none rounded-lg ${dark ? "text-gray-200 hover:bg-[#3B3B3B]" : "text-gray-900 hover:bg-[#e9eaea]"} ${active && !dark ? 'bg-gray-200' : ''} ${active && dark ? 'bg-[#3B3B3B]' : ''}`}
                    value={language}
                  >
                    {() => (
                      <div className="flex flex-row py-2 px-3 md:px-4">
                        <Image
                          className="flex items-center justify-center"
                          height={18}
                          width={18}
                          src={`/${language.ISO}.svg`}
                          alt={language.label}
                        />
                        <p className="pl-2 text-sm">{language.label}</p>
                      </div>
                    )}
                  </Listbox.Option>
                </Link>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
