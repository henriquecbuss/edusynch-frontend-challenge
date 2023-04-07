'use client'

import { useState } from 'react'
import clsx from 'clsx'
import Icons from './Icons'
import SlideOver from './SlideOver'
import Link from 'next/link'
import SignInButton from './SignInButton'
import SignUpButton from './SignUpButton'

type Props = {
  className?: string
  headerRef: React.RefObject<HTMLElement>
  coinCarrouselRef: React.RefObject<HTMLElement>
}

const User = (props: Props) => {
  const isSignedIn = false

  return isSignedIn ? <SignedInView {...props} /> : <SignedOutView {...props} />
}

const SignedInView = ({ className }: Props) => {
  // TODO - Implement signed in view
  return (
    <div className="flex items-center ml-auto">
      <div
        className={clsx(
          'w-6 h-6 rounded-full bg-secondary-600 mr-2',
          className
        )}
      ></div>
      <p className="hidden md:block text-label mr-1">Aulus</p>
      <Icons.ChevronDown />
    </div>
  )
}

type ForegroundElement = 'slideOver' | 'signInModal' | 'signUpModal'

const SignedOutView = ({ className, headerRef, coinCarrouselRef }: Props) => {
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
        className={clsx('hidden md:flex flex-nowrap items-center', className)}
      >
        <SignInButton variant="ghost" onClick={() => setIsSlideOverOpen(false)}>
          Sign in
        </SignInButton>
        <SignUpButton
          onClick={() => setIsSlideOverOpen(false)}
          className="ml-6"
        >
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

export default User
