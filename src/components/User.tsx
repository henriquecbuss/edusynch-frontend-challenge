'use client'

import clsx from 'clsx'
import Icons from './Icons'
import Button from './Button'

type Props = { className?: string }

export default function User(props: Props) {
  const isSignedIn = false

  return isSignedIn ? <SignedInView {...props} /> : <SignedOutView {...props} />
}

function SignedInView({ className }: Props) {
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

function SignedOutView({ className }: Props) {
  // TODO - Create mobile view
  return (
    <>
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
    </>
  )
}
