import { useState } from 'react'
import clsx from 'clsx'
import Icons from './Icons'

type Type = 'email' | 'password' | 'username'

type Props = {
  type: Type
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>

const Input = ({ type, className, ...inputAttrs }: Props) => {
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
    <label
      className={clsx(
        'border border-secondary-300 rounded-md p-4 flex items-center gap-2 focus-within:border focus-within:border-primary focus-within:ring ring-primary-200',
        className
      )}
    >
      <IconForType type={type} className="flex-shrink-0" />
      <input
        type={inputType}
        className="focus:outline-none text-label w-full"
        {...inputAttrs}
      ></input>
      {type === 'password' && (
        <button
          onClick={handleTogglePasswordVisibility}
          className="flex-shrink-0 group"
          type="button"
        >
          <Icons.Eye className="fill-secondary-300 group-hover:fill-secondary-400 group-active:fill-secondary-500 transition-colors" />
        </button>
      )}
    </label>
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
