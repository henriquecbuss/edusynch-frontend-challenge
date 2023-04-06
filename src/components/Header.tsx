import Logo from './Logo'
import Link from 'next/link'
import User from './User'

export default function Header() {
  return (
    <>
      <header className="container py-4 flex items-center">
        <Link href="/" className="md:mr-10">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <HeaderLink href="#about-us">About us</HeaderLink>

          <HeaderLink href="#top-cryptos">Top cryptos</HeaderLink>
        </nav>

        <CoinCarrousel className="hidden lg:block ml-auto" />

        <User className="hidden md:block ml-auto lg:ml-20" />
      </header>
      <hr className="text-secondary-200" />
      <CoinCarrousel className="lg:hidden shadow-md" />
    </>
  )
}

function HeaderLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link href={href} className="text-label hover:underline">
      {children}
    </Link>
  )
}

const CoinCarrousel = ({ className }: { className?: string }) => {
  return <div className={className}>coin carrousel</div>
}
