'use client'

import { Disclosure, Transition } from '@headlessui/react'
import Image from 'next/image'
import ChevronDown from './Icons/ChevronDown'
import clsx from 'clsx'
import FormattedNumber from './FormattedNumber'

type Crypto = {
  name: string
  image: string
  symbol: string
  price: number
  changePercentage: number
}

type Props = {
  crypto: Crypto
  className?: string
}

const CryptoDisclosure = ({ crypto, className }: Props) => {
  return (
    <Disclosure>
      <Disclosure.Button
        className={clsx('flex items-center gap-2 p-4', className)}
      >
        <Image src={crypto.image} width={24} height={24} alt="" />
        <p className="text-small-label">
          {crypto.name} <span className="text-secondary">{crypto.symbol}</span>
        </p>
        <ChevronDown className="!fill-primary-300 ml-auto w-4 h-4 ui-open:rotate-180 transition-transform" />
      </Disclosure.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Disclosure.Panel className="border-t border-secondary-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-small-label text-secondary">Price</span>
            <FormattedNumber
              number={crypto.price}
              options={{
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-small-label text-secondary">Change</span>
            <FormattedNumber
              number={crypto.changePercentage / 100}
              className={clsx({
                'text-tertiary-700': crypto.changePercentage > 0,
                'text-quaternary-700': crypto.changePercentage < 0,
              })}
              options={{
                signDisplay: 'always',
                style: 'percent',
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }}
            />
          </div>
        </Disclosure.Panel>
      </Transition>
    </Disclosure>
  )
}

export default CryptoDisclosure
