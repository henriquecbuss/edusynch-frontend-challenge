import Logo from './Logo'
import Link from 'next/link'
import Icons from './Icons'
import clsx from 'clsx'

export default function Header() {
  return (
    <>
      <header className="container py-4 flex items-center">
        <Link href="/" className="md:mr-10">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/about">About us</Link>

          <Link href="#">Top cryptos</Link>
        </nav>

        <CoinCarrousel className="hidden lg:block ml-auto" />

        <User className="hidden md:block ml-auto lg:ml-20" />

        <Icons.Hamburger className="md:hidden" />
      </header>
      <hr className="text-secondary-200" />
      <CoinCarrousel className="lg:hidden shadow-md" />
    </>
  )
}

const CoinCarrousel = ({ className }: { className?: string }) => {
  return <div className={className}>coin carrousel</div>
}

const User = ({
  isSignedIn,
  className,
}: {
  isSignedIn?: boolean
  className?: string
}) => {
  if (isSignedIn) {
    return (
      <div
        className={clsx('w-8 h-8 rounded-full bg-secondary-600', className)}
      ></div>
    )
  } else {
    return (
      <div className={clsx('flex flex-nowrap items-center', className)}>
        <button className="rounded-full px-2 py-1">Sign in</button>
        <button className="bg-primary rounded-full px-2 py-1">Sign up</button>
      </div>
    )
  }
}
