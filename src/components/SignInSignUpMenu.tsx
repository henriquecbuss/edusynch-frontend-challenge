import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import Icons from './Icons'
import SignInButton from './SignInButton'
import SignUpButton from './SignUpButton'
import SlideOver from './SlideOver'

type Props = {
  className?: string
  headerRef: React.RefObject<HTMLElement>
  coinCarrouselRef: React.RefObject<HTMLElement>
}

const SignInSignUpMenu = ({
  className,
  headerRef,
  coinCarrouselRef,
}: Props) => {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false)

  return (
    <>
      <button
        className="md:hidden ml-auto"
        onClick={() => setIsSlideOverOpen((prev) => !prev)}
        aria-label="Open navigation menu"
      >
        <Icons.Hamburger />
      </button>
      <SlideOver
        isOpen={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        side="right"
        overlayClassName="top-[--top-distance]"
        overlayStyle={{
          '--top-distance': `${
            (headerRef.current?.clientHeight ?? 0) +
            (coinCarrouselRef.current?.clientHeight ?? 0)
          }px`,
        }}
        dialogClassName="mt-[--header-height] border-t border-secondary-300"
        dialogStyle={{
          '--header-height': `${headerRef.current?.clientHeight}px`,
        }}
      >
        <div className="flex flex-col items-center gap-8 px-[62px]">
          <SlideOverLink
            href="#about-us"
            onClick={() => setIsSlideOverOpen(false)}
          >
            About us
          </SlideOverLink>
          <SlideOverLink
            href="#top-cryptos"
            onClick={() => setIsSlideOverOpen(false)}
          >
            Top Cryptos
          </SlideOverLink>
          <SignInButton
            variant="ghost"
            onClick={() => setIsSlideOverOpen(false)}
          >
            Sign in
          </SignInButton>
          <SignUpButton onClick={() => setIsSlideOverOpen(false)}>
            Sign up
          </SignUpButton>
        </div>
      </SlideOver>
      <div
        className={clsx(
          'hidden md:flex flex-nowrap items-center gap-6',
          className
        )}
      >
        <SignInButton variant="ghost" onClick={() => setIsSlideOverOpen(false)}>
          Sign in
        </SignInButton>
        <SignUpButton onClick={() => setIsSlideOverOpen(false)}>
          Sign up
        </SignUpButton>
      </div>
    </>
  )
}

const SlideOverLink = ({
  href,
  children,
  onClick,
}: {
  href: string
  children: React.ReactNode
  onClick?: () => void
}) => {
  return (
    <Link href={href} className="text-label hover:underline" onClick={onClick}>
      {children}
    </Link>
  )
}

export default SignInSignUpMenu
