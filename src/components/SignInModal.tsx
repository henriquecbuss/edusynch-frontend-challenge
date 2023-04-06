import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import BrandName from './BrandName'
import Icons from './Icons'
import Input from './Input'
import Link from 'next/link'
import Button from './Button'

type Props = {
  isOpen: boolean
  close: () => void
}

const SignInModal = ({ isOpen, close }: Props) => {
  return (
    <div className="isolate">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-secondary-500 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xs transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all relative">
                  <Dialog.Title as="h3" className="text-center">
                    Sign in to <BrandName />
                  </Dialog.Title>
                  <button onClick={close} className="absolute top-4 right-4">
                    <Icons.XMark className="hover:fill-secondary-400 active:fill-secondary-600 transition-colors" />
                  </button>
                  <Input type="email" placeholder="Email" className="mt-6" />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="mt-6"
                  />
                  <Link
                    href="#"
                    className="text-small-label text-secondary hover:underline block w-max ml-auto mt-[9px]"
                  >
                    Forgot password?
                  </Link>

                  <Button
                    onClick={() => {
                      // TODO - Handle sign in
                    }}
                    className="mt-4 w-full py-3"
                  >
                    Sign in
                  </Button>

                  <span className="text-small-label mt-4">
                    <span className="hidden md:inline">
                      Don{"'"}t have an account?{' '}
                    </span>
                    <button
                      onClick={() => {
                        // TODO - Handle sign up
                      }}
                      className="font-bold hover:underline"
                    >
                      Sign up to <BrandName />
                    </button>
                  </span>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default SignInModal
