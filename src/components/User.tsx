'use client'

import { useState } from 'react'
import clsx from 'clsx'
import Icons from './Icons'
import SlideOver from './SlideOver'
import Link from 'next/link'
import SignInButton from './SignInButton'
import SignUpButton from './SignUpButton'

type Props = {
  className?: string
}

const User = ({ className }: Props) => {
  // TODO - Implement signed in view
  return (
    <div className={clsx('flex items-center', className)}>
      <div className="w-6 h-6 rounded-full bg-secondary-600 mr-2"></div>
      <p className="hidden md:block text-label mr-1">Aulus</p>
      <Icons.ChevronDown className="w-2 h-2" />
    </div>
  )
}

export default User
