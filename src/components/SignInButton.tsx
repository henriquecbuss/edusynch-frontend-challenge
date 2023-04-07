'use client'

import useModal from '@/hooks/useModal'
import Button, { Props as ButtonProps } from './Button'

type Props = Omit<ButtonProps, 'type'>

const SignInButton = ({ onClick, ...props }: Props) => {
  const { open } = useModal('signIn')

  return (
    <Button
      {...props}
      onClick={(e) => {
        if (onClick) onClick(e)

        open()
      }}
    />
  )
}

export default SignInButton
