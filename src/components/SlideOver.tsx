import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'

type Side = 'left' | 'right'

type Props = {
  side: Side
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  overlayClassName?: string
  overlayStyle?: React.CSSProperties
  dialogClassName?: string
  dialogStyle?: React.CSSProperties
}

const SlideOver = ({
  side,
  children,
  isOpen,
  onClose,
  overlayClassName,
  overlayStyle,
  dialogClassName,
  dialogStyle,
}: Props) => {
  return (
    <div className="isolate">
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 md:hidden" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={clsx(
                'fixed inset-0 bg-secondary-500 bg-opacity-75 transition-opacity',
                overlayClassName
              )}
              style={overlayStyle}
            />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div
                className={clsx(
                  'pointer-events-none fixed inset-y-0 flex max-w-full',
                  { 'left-0': side === 'left', 'right-0': side === 'right' }
                )}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom={
                    side === 'left' ? '-translate-x-full' : 'translate-x-full'
                  }
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo={
                    side === 'left' ? '-translate-x-full' : 'translate-x-full'
                  }
                >
                  <Dialog.Panel
                    className={clsx(
                      'pointer-events-auto relative',
                      dialogClassName
                    )}
                    style={dialogStyle}
                  >
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      {children}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

export default SlideOver
