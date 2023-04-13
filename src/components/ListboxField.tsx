import { Transition, Listbox } from "@headlessui/react";
import { Field, FieldProps, useField } from "formik";
import { Fragment, useState } from "react";
import FormError from "./FormError";

type Props<T> = {
  name: string;
  options: T[];
  disabled?: boolean;
  optionToKey: (option: T) => string;
  RenderButton: React.FC<{ open: boolean; value: T | null }>;
  RenderOption: React.FC<{ value: T }>;
};

function ActualField<T>(props: Props<T>) {
  const [field, meta, helpers] = useField(props);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    meta.error
  );

  return (
    <>
      <Field component={ListboxField} {...props} />
      <FormError
        show={
          meta.touched &&
          typeof meta.error === "string" &&
          meta.error.length > 0
        }
        beforeEnter={() => {
          setErrorMessage(meta.error);
        }}
        afterLeave={() => {
          setErrorMessage(undefined);
        }}
      >
        {errorMessage}
      </FormError>
    </>
  );
}

function ListboxField<T>({
  field,
  form,
  options,
  disabled,
  optionToKey,
  RenderButton,
  RenderOption,
}: FieldProps<T | null> & {
  options: T[];
  disabled?: boolean;
  optionToKey: (option: T) => string;
  RenderButton: React.FC<{ open: boolean; value: T | null }>;
  RenderOption: React.FC<{ value: T }>;
}) {
  return (
    <div className="relative">
      <Listbox
        value={field.value}
        onChange={(v) => {
          form.setFieldValue(field.name, v);
        }}
        disabled={disabled}
      >
        {({ open }) => (
          <>
            <Listbox.Button className="flex w-full items-center justify-between rounded-md border border-secondary-300 p-4 transition-colors ui-disabled:bg-secondary-200">
              <RenderButton open={open} value={field.value} />
            </Listbox.Button>
            <Transition
              as={Fragment}
              enter="transition ease-in duration-100 origin-top"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100 origin-top"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
            >
              <Listbox.Options className="absolute inset-x-0 top-full isolate z-10 mt-2 max-h-60 overflow-auto rounded-md border border-secondary-300 bg-white">
                {options.map((option) => (
                  <Listbox.Option
                    key={optionToKey(option)}
                    value={option}
                    className="flex cursor-pointer items-center justify-between border-b border-secondary-300 p-4 transition-colors last:border-none hover:bg-secondary-200"
                  >
                    <RenderOption value={option} />
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
}

// export default ListboxField
export default ActualField;
