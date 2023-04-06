import clsx from 'clsx'

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  className?: string
  variant?: Variant
  children: React.ReactNode
}

type Variant = 'primary' | 'ghost'

const defaultClassName = 'text-label'

const primaryClassName =
  'bg-primary text-white py-2 px-[26.5px] rounded-full hover:bg-primary-400 active:bg-primary-600 transition-colors'
const ghostClassName =
  'bg-transparent hover:underline active:text-secondary-900 transition-colors'

const Button = ({
  onClick,
  className,
  variant = 'primary',
  children,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        defaultClassName,
        {
          [primaryClassName]: variant === 'primary',
          [ghostClassName]: variant === 'ghost',
        },
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
