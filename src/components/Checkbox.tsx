import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { Field, useField } from "formik";
import { useState } from "react";

type Props = {
  name: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  required?: boolean;
};

const Checkbox = (props: Props) => {
  const { className, children, ...otherProps } = props;
  const [field, meta, helpers] = useField(props);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    meta.error
  );

  return (
    <label className={clsx("flex items-start text-label", className)}>
      <Field
        type="checkbox"
        className="mr-4 rounded-[4px] border-primary text-primary accent-primary focus:ring-primary disabled:text-secondary"
        {...otherProps}
      />
      <div className="flex flex-col items-start">
        {children}

        <Transition
          show={
            meta.touched &&
            typeof meta.error === "string" &&
            meta.error.length > 0
          }
          enter="ease-out duration-300 transition-all"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="ease-out duration-200 transition-all"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-2"
          as="div"
          className="mt-2 text-left text-label text-quaternary-700"
          beforeEnter={() => {
            setErrorMessage(meta.error);
          }}
          afterLeave={() => {
            setErrorMessage(undefined);
          }}
        >
          {errorMessage}
        </Transition>
      </div>
    </label>
  );
};

export default Checkbox;
