'use client'

import { useState } from 'react'
import clsx from 'clsx'
import Icons from './Icons'
import { Transition } from '@headlessui/react'
import { Field, FieldProps, useField } from 'formik'
import { validateEmail } from '@/utils/validation/email'

type Type = 'email' | 'password' | 'username'

type FinalCustomInputProps = {
  type: Type
  name: string
  required?: boolean
  className?: string
  placeholder?: string
  disabled?: boolean
}

export const Input = (props: FinalCustomInputProps) => {
  const [field, meta, helpers] = useField(props)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    meta.error
  )

  return (
    <label className="flex flex-col w-full">
      <Field
        {...props}
        component={CustomInput}
        validate={(value: any) => {
          if (typeof value !== 'string') return undefined

          if (props.required && value.length === 0) {
            return 'Required'
          }

          if (props.type === 'email') {
            const result = validateEmail(value, {
              required: props.required,
            })

            if (result.ok) {
              return undefined
            }

            return result.error
          }

          return undefined
        }}
      />
      <Transition
        show={
          meta.touched &&
          typeof meta.error === 'string' &&
          meta.error.length > 0
        }
        enter="ease-out duration-300 transition-all"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="ease-out duration-200 transition-all"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-2"
        as="div"
        className="text-quaternary-700 text-label text-left mt-2 ml-4"
        beforeEnter={() => {
          setErrorMessage(meta.error)
        }}
        afterLeave={() => {
          setErrorMessage(undefined)
        }}
      >
        {errorMessage}
      </Transition>
    </label>
  )
}

type CustomProps = {
  type: Type
  className?: string
  disabled?: boolean
} & FieldProps

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
        case 'email':
          return 'email'
        case 'password':
          return 'password'
        case 'username':
          return 'text'
      }
    }
  )

  const handleTogglePasswordVisibility = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (type === 'password') {
      setInputType((prev) => (prev === 'password' ? 'text' : 'password'))
    }
  }

  return (
    <div
      className={clsx(
        'w-full border border-secondary-300 rounded-md p-4 flex items-center gap-2 focus-within:border focus-within:border-primary focus-within:ring ring-primary-200 transition-colors',
        className,
        { 'bg-secondary-200': props.disabled }
      )}
    >
      <IconForType type={type} className="flex-shrink-0" />
      <input
        type={inputType}
        {...field}
        {...props}
        className="focus:outline-none text-label w-full border-none p-0 focus:ring-0 placeholder:text-secondary-400 bg-transparent"
      />

      {type === 'password' && (
        <button
          onClick={handleTogglePasswordVisibility}
          className="flex-shrink-0 group"
          type="button"
        >
          <Icons.Eye className="fill-secondary-300 group-hover:fill-secondary-400 group-active:fill-secondary-500 transition-colors" />
        </button>
      )}
    </div>
  )
}

const IconForType = ({
  type,
  className,
}: {
  type: Type
  className?: string
}) => {
  switch (type) {
    case 'email':
      return <Icons.Envelope className={className} />
    case 'password':
      return <Icons.Lock className={className} />
    case 'username':
      return <Icons.User className={className} />
  }
}

export default Input
