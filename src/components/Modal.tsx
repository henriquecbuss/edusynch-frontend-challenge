import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Icons from "./Icons";
import clsx from "clsx";

export type Props = {
  isOpen: boolean;
  close: () => void;
};

export const Title = ({
  children,
  className,
  as,
}: {
  children: React.ReactNode;
  className?: string;
  as: `h${2 | 3 | 4 | 5 | 6}`;
}) => {
  return (
    <Dialog.Title as={as} className={clsx("text-center", className)}>
      {children}
    </Dialog.Title>
  );
};

export const Root = ({
  isOpen,
  close,
  children,
}: Props & { children: React.ReactNode }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <div className="isolate">
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
            <div className="fixed inset-0 z-40 bg-secondary-500 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
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
                <Dialog.Panel className="relative w-full max-w-xs transform rounded-lg bg-white p-6 shadow-xl transition-all">
                  <button onClick={close} className="absolute right-4 top-4">
                    <Icons.XMark className="transition-colors hover:fill-secondary-400 active:fill-secondary-600" />
                  </button>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </div>
    </Transition>
  );
};
