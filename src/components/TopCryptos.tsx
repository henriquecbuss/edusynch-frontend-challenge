'use client'

import { useEffect, useState } from 'react'
import Button from './Button'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Asset } from '@/utils/coinapi'
import CryptoDisclosure from './CryptoDisclosure'
import CryptoRow from './CryptoRow'
import clsx from 'clsx'

type Props = {
  assets: Asset[]
}
const TopCryptosViewMoreContainer = ({ assets }: Props) => {
  const [viewMore, setViewMore] = useState(false)
  const [smParent] = useAutoAnimate()
  const [mdParent, mdEnableAnimations] = useAutoAnimate()

  useEffect(() => {
    mdEnableAnimations(viewMore)
  }, [viewMore, mdEnableAnimations])

  return (
    <>
      <div className="flex flex-col mt-4 md:hidden" ref={smParent}>
        {assets.slice(0, viewMore ? 10 : 4).map((asset) => (
          <CryptoDisclosure
            asset={asset}
            key={asset.id}
            className="even:bg-secondary-100"
          />
        ))}
      </div>

      <table className="hidden md:table table-auto w-full text-left mt-6">
        <thead>
          <tr>
            <Th className="w-1/12">#</Th>
            <Th className="w-1/3">Crypto</Th>
            <Th className="w-1/3">Price</Th>
            <Th className="w-1/3">Change</Th>
            <Th>Trade</Th>
          </tr>
        </thead>
        <tbody ref={mdParent}>
          {assets.slice(0, viewMore ? 10 : 4).map((asset, index) => (
            <CryptoRow asset={asset} index={index + 1} key={asset.id} />
          ))}
        </tbody>
      </table>

      <Button
        variant="ghost"
        className="text-primary mt-4 mx-auto block"
        onClick={() => setViewMore((prev) => !prev)}
      >
        {viewMore ? 'View less -' : 'View more +'}
      </Button>
    </>
  )
}

const Th = ({
  children,
  className,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <th
      className={clsx(
        'py-4 px-6 font-normal text-secondary text-label',
        className
      )}
    >
      {children}
    </th>
  )
}

export default TopCryptosViewMoreContainer
