'use client'

import { useRef } from 'react'
import Logo from './Logo'
import Link from 'next/link'
import User from './User'
import CoinCarrousel from './CoinCarrousel'

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

        <CoinCarrousel className="hidden lg:block ml-auto" coins={[]} />

        <User
          className="hidden md:block ml-auto lg:ml-20"
          headerRef={headerRef}
          coinCarrouselRef={carrouselRef}
        />
      </header>
      <hr className="text-secondary-200" />

      <CoinCarrousel
        className="lg:hidden shadow-md"
        ref={carrouselRef}
        coins={[]}
      />
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
