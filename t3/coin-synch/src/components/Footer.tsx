import BrandName from './BrandName'
import Logo from './Logo'

const Footer = () => {
  return (
    <footer className="container py-5 lg:py-6 flex items-center justify-center md:justify-between shadow-[0px_-4px_8px_rgba(77,77,77,0.1)]">
      <p className="hidden md:block text-label">
        Copyright © 2022 - All rights reserved
      </p>
      <Logo className="h-4 w-[95px]" />
    </footer>
  )
}

export default Footer
