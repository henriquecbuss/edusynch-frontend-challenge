'use client'

import clsx from 'clsx'
import Icons from './Icons'
import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import Button from './Button'
import { useRouter } from 'next/navigation'

type Props = {
  className?: string
}

const User = ({ className }: Props) => {
  const router = useRouter()
  const { isLoaded, user } = useUser()
  const { signOut } = useAuth()

  if (!isLoaded) {
    return (
      <div className={clsx('flex items-center', className)} aria-hidden>
        <div className="rounded-full mr-2 bg-secondary-600 animate-pulse w-6 h-6" />
        <div className="hidden md:block rounded w-20 h-4 bg-secondary-600 animate-pulse" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <Menu as="div" className={clsx('relative', className)}>
      <Menu.Button className="flex items-center">
        {user && user.imageUrl && (
          <Image
            width={24}
            height={24}
            src={user.imageUrl ?? '/logo.svg'}
            alt=""
            className="rounded-full mr-2"
          />
        )}
        {user && !user.imageUrl && (
          <div className="w-6 h-6 rounded-full bg-secondary-600 mr-2 uppercase text-white">
            {user.fullName?.charAt(0)}
          </div>
        )}
        {!user && (
          <div className="w-6 h-6 rounded-full bg-secondary-600 mr-2"></div>
        )}
        <p className="hidden md:block text-label mr-1">{user?.firstName}</p>
        <Icons.ChevronDown className="w-2 h-2" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 p-1 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Button
            className="whitespace-nowrap text-right text-label transition-colors p-2 rounded hover:no-underline hover:bg-quaternary-200 hover:text-quaternary-700"
            onClick={() => {
              signOut().then(() => {
                router.push('/')
              })
            }}
          >
            Sign out
          </Menu.Button>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default User
