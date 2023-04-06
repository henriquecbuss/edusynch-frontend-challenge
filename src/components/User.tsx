'use client'

import { useState } from 'react'
import clsx from 'clsx'
import Icons from './Icons'
import Button from './Button'
import SlideOver from './SlideOver'
import Link from 'next/link'
import SignInModal from './SignInModal'

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
  // TODO
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

const SignedOutView = ({ className, headerRef, coinCarrouselRef }: Props) => {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false)
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)

  return (
    <>
      <button
        className="md:hidden ml-auto"
        onClick={() => setIsSlideOverOpen((currState) => !currState)}
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
          <Button
            variant="ghost"
            onClick={() => {
              setIsSlideOverOpen(false)
              setIsSignInModalOpen(true)
            }}
          >
            Sign in
          </Button>
          <Button onClick={() => {}}>Sign up</Button>
        </div>
      </SlideOver>
      <div
        className={clsx('hidden md:flex flex-nowrap items-center', className)}
      >
        <Button variant="ghost" onClick={() => {}}>
          Sign in
        </Button>
        <Button onClick={() => {}} className="ml-6">
          Sign up
        </Button>
      </div>
      <SignInModal
        isOpen={isSignInModalOpen}
        close={() => setIsSignInModalOpen(false)}
      />
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