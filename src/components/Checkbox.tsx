'use client'

import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Field, useField } from 'formik'
import { useState } from 'react'

type Props = {
  name: string
  children: React.ReactNode
  className?: string
  required?: boolean
}

const Checkbox = (props: Props) => {
  const { className, children, required, name } = props
  const [field, meta, helpers] = useField(props)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    meta.error
  )

  return (
    <label className={clsx('text-label flex items-start', className)}>
      <Field
        type="checkbox"
        className="rounded-[4px] border-primary mr-4 accent-primary focus:ring-primary text-primary"
        required={required}
        name={name}
      />
      <div className="flex flex-col items-start">
        {children}

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
          className="text-quaternary-700 text-label text-left mt-2"
          beforeEnter={() => {
            setErrorMessage(meta.error)
          }}
          afterLeave={() => {
            setErrorMessage(undefined)
          }}
        >
          {errorMessage}
        </Transition>
      </div>
    </label>
  )
}

export default Checkbox
