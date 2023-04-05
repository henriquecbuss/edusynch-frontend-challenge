import Image from 'next/image'

type Props = {
  width?: number
  height?: number
  className?: string
}

export default function Logo({ className, width = 124, height = 21 }: Props) {
  return (
    <Image
      alt="CoinSynch logo"
      src="/logo.svg"
      width={width}
      height={height}
      className={className}
    />
  )
}
