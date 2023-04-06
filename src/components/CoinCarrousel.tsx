import { forwardRef } from 'react'

type Coin = {
  symbol: string
  price: number
  change: number
}

const CoinCarrousel = forwardRef<
  HTMLDivElement,
  { className?: string; coins: Coin[] }
>(({ className }, ref) => {
  return (
    <div className={className} ref={ref}>
      coin carrousel
    </div>
  )
})
CoinCarrousel.displayName = 'CoinCarrousel'

export default CoinCarrousel
