'use client'

import { useRef } from 'react'
import Logo from './Logo'
import Link from 'next/link'
import User from './User'
import CoinCarrousel from './CoinCarrousel'

const coins = [
  {
    symbol: 'BIT',
    price: 23.62,
    change: 7.082,
  },
  {
    symbol: 'DOG',
    price: 23.62,
    change: -5.23,
  },
  {
    symbol: 'ETH',
    price: 23.62,
    change: 7.082,
  },
]

const Header = () => {
  const headerRef = useRef<HTMLElement>(null)
  const carrouselRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <header className="container py-4 flex items-center" ref={headerRef}>
        <Link href="/" className="md:mr-10">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <HeaderLink href="#about-us">About us</HeaderLink>

          <HeaderLink href="#top-cryptos">Top cryptos</HeaderLink>
        </nav>

        <CoinCarrousel
          className="hidden lg:block ml-auto max-w-[360px]"
          coins={coins}
        />

        <User
          className="hidden md:block ml-auto lg:ml-20"
          headerRef={headerRef}
          coinCarrouselRef={carrouselRef}
        />
      </header>
      <hr className="text-secondary-200" />

      <div className="lg:hidden shadow-md">
        <CoinCarrousel
          className="max-w-min mx-auto"
          ref={carrouselRef}
          coins={coins}
        />
      </div>
    </>
  )
}

const HeaderLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  return (
    <Link href={href} className="text-label hover:underline">
      {children}
    </Link>
  )
}

export default Header
