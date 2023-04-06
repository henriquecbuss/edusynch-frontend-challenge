import clsx from 'clsx'

type Props = {
  children: React.ReactNode
  className?: string
}

const Checkbox = ({ className, children }: Props) => {
  return (
    <label className={clsx('text-label flex items-start', className)}>
      <input
        type="checkbox"
        className="rounded-[4px] border-primary mr-4 accent-primary focus:ring-primary text-primary"
      />
      {children}
    </label>
  )
}

export default Checkbox
