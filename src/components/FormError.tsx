import { Transition } from "@headlessui/react";

const FormError = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  show: boolean;
  beforeEnter?: () => void;
  afterLeave?: () => void;
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
    className="ml-4 mt-2 text-left text-label text-quaternary-700"
  >
    {children}
  </Transition>
);

export default FormError;
