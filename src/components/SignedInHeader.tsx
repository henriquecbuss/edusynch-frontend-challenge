'use client'

import { useRef, useState } from 'react'
import Icons from './Icons'
import SlideOver from './SlideOver'
import Logo from './Logo'
import User from './User'
import Link from 'next/link'

const SignedInHeader = () => {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  return (
    <>
      <header
        className="container py-4 grid grid-cols-3 grid-rows-1 shadow-md"
        ref={headerRef}
      >
        <button
          className="md-hidden place-self-start"
          onClick={() => setIsSlideOverOpen((prev) => !prev)}
          aria-label="Open navigation menu"
        >
          <Icons.Hamburger />
        </button>

        <Logo className="place-self-center" />

        <User className="place-self-end" />
      </header>

      <SlideOver
        isOpen={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        side="left"
        hiddenBreakpoint="lg"
        overlayClassName="top-[--top-distance]"
        overlayStyle={{
          '--top-distance': `${headerRef.current?.clientHeight ?? 0}px`,
        }}
        dialogClassName="mt-[--header-height] border-t border-secondary-300"
        dialogStyle={{
          '--header-height': `${headerRef.current?.clientHeight}px`,
        }}
      >
        <nav className="flex flex-col gap-8 px-6 py-4">
          <SlideOverLink
            href="#"
            icon={(props) => <Icons.CryptoWallet {...props} />}
          >
            Lorem ipsum
          </SlideOverLink>
          <SlideOverLink
            href="#"
            icon={(props) => <Icons.CryptoCurrencyCircle {...props} />}
          >
            Lorem ipsum
          </SlideOverLink>
          <SlideOverLink
            href="#"
            icon={(props) => <Icons.CryptoCurrency {...props} />}
          >
            Lorem ipsum
          </SlideOverLink>
          <SlideOverLink href="#" icon={(props) => <Icons.Chart {...props} />}>
            Lorem ipsum
          </SlideOverLink>

          <button
            aria-label="Close navigation menu"
            className="mt-[14px] w-max"
            onClick={() => setIsSlideOverOpen(false)}
          >
            <Icons.CircledArrowLeft className="w-6 h-6" />
          </button>
        </nav>
      </SlideOver>
    </>
  )
}

const SlideOverLink = ({
  href,
  icon,
  children,
}: {
  href: string
  icon: (props: { className: string }) => React.ReactNode
  children: React.ReactNode
  onClick?: () => void
}) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 text-label hover:text-primary hover:underline transition-colors"
    >
      {icon({ className: 'h-6 w-6' })}
      {children}
    </Link>
  )
}

export default SignedInHeader
