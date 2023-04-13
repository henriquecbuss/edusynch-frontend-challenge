import { Transition, TransitionRootProps } from '@headlessui/react'
import { ElementType } from 'react'

const FormError = <T extends ElementType>({
  children,
  ...props
}: {
  children: React.ReactNode
  show: boolean
  beforeEnter?: () => void
  afterLeave?: () => void
}) => (
  <Transition
    {...props}
    enter="ease-out duration-300 transition-all"
    enterFrom="opacity-0 -translate-y-2"
    enterTo="opacity-100 translate-y-0"
    leave="ease-out duration-200 transition-all"
    leaveFrom="opacity-100 translate-y-0"
    leaveTo="opacity-0 -translate-y-2"
    as="div"
    className="text-quaternary-700 text-label text-left mt-2 ml-4"
  >
    {children}
  </Transition>
)

export default FormError
