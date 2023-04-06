import { useState } from 'react'
import clsx from 'clsx'
import Icons from './Icons'

type Type = 'email' | 'password'

type Props = {
  type: Type
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>

const Input = ({ type, className, ...inputAttrs }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleTogglePasswordVisibility = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPasswordVisible((prev) => !prev)
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
        type={
          type === 'password' ? (isPasswordVisible ? 'text' : 'password') : type
        }
        className="focus:outline-none text-label w-full"
        {...inputAttrs}
      ></input>
      {type === 'password' && (
        <button
          onClick={handleTogglePasswordVisibility}
          className="flex-shrink-0 group"
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
  }
}

export default Input
