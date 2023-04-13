import { useState } from "react";
import clsx from "clsx";
import Icons from "./Icons";
import { Transition } from "@headlessui/react";
import { Field, FieldProps, useField } from "formik";
import { validateEmail } from "@/utils/validation/email";
import FormError from "./FormError";

type Type = "email" | "password" | "username" | "numeric";

type FinalCustomInputProps = {
  type: Type;
  name: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
};

export const Input = (props: FinalCustomInputProps) => {
  const [field, meta, helpers] = useField(props);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    meta.error
  );

  return (
    <label className="flex w-full flex-col">
      <Field
        {...props}
        component={CustomInput}
        validate={(value: any) => {
          if (typeof value !== "string") return undefined;

          if (props.required && value.length === 0) {
            return "Required";
          }

          if (props.type === "email") {
            const result = validateEmail(value, {
              required: props.required,
            });

            if (result.ok) {
              return undefined;
            }

            return result.error;
          }

          if (props.type === "password") {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
          }

          return undefined;
        }}
      />
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
    </label>
  );
};

type CustomProps = {
  type: Type;
  className?: string;
  disabled?: boolean;
} & FieldProps;

const CustomInput = ({
  type,
  className,
  field,
  form,
  ...props
}: CustomProps) => {
  const [inputType, setInputType] = useState<React.HTMLInputTypeAttribute>(
    () => {
      switch (type) {
        case "email":
          return "email";
        case "password":
          return "password";
        case "username":
          return "text";
        case "numeric":
          return "number";
      }
    }
  );

  const handleTogglePasswordVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (type === "password") {
      setInputType((prev) => (prev === "password" ? "text" : "password"));
    }
  };

  return (
    <div
      className={clsx(
        "flex w-full items-center gap-2 rounded-md border border-secondary-300 p-4 ring-primary-200 transition-colors focus-within:border focus-within:border-primary focus-within:ring",
        className,
        { "bg-secondary-200": props.disabled }
      )}
    >
      <IconForType type={type} className="flex-shrink-0" />
      <input
        type={inputType}
        {...field}
        {...props}
        className="w-full border-none bg-transparent p-0 text-label placeholder:text-secondary-400 focus:outline-none focus:ring-0"
      />

      {type === "password" && (
        <button
          onClick={handleTogglePasswordVisibility}
          className="group flex-shrink-0"
          type="button"
        >
          <Icons.Eye className="fill-secondary-300 transition-colors group-hover:fill-secondary-400 group-active:fill-secondary-500" />
        </button>
      )}
    </div>
  );
};

const IconForType = ({
  type,
  className,
}: {
  type: Type;
  className?: string;
}) => {
  switch (type) {
    case "email":
      return <Icons.Envelope className={className} />;
    case "password":
      return <Icons.Lock className={className} />;
    case "username":
      return <Icons.User className={className} />;
    case "numeric":
      return null;
  }
};

export default Input;
