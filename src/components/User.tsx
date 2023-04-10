'use client'

import clsx from 'clsx'
import Icons from './Icons'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Fragment } from 'react'

type Props = {
  className?: string
}

const User = ({ className }: Props) => {
  return (
    <Menu as="div" className={clsx('relative', className)}>
      <Menu.Button className="flex items-center">
        <div className="w-6 h-6 rounded-full bg-secondary-600 mr-2"></div>
        <p className="hidden md:block text-label mr-1">Aulus</p>
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
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/"
                className={clsx(
                  'whitespace-nowrap text-right text-label transition-colors p-1 rounded',
                  {
                    'bg-quaternary-200 text-quaternary-700': active,
                  }
                )}
              >
                Sign out
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default User
