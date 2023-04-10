'use client'

import { useRef } from 'react'
import Logo from './Logo'
import Link from 'next/link'
import User from './User'
import CoinCarrousel from './CoinCarrousel'
import { Asset } from '@/utils/coinapi'

type Props = {
  assets: Asset[]
}

const SignedOutHeader = ({ assets }: Props) => {
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
          className="hidden lg:flex ml-auto max-w-[360px]"
          assets={assets}
        />

        <User
          className="hidden md:block ml-auto lg:ml-20"
          headerRef={headerRef}
          coinCarrouselRef={carrouselRef}
        />
      </header>
      <hr className="text-secondary-200" />

      <div className="lg:hidden shadow-md" ref={carrouselRef}>
        <CoinCarrousel className="max-w-[360px] mx-auto" assets={assets} />
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
    <a href={href} className="text-label hover:underline">
      {children}
    </a>
  )
}

export default SignedOutHeader
