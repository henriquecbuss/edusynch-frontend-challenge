'use client'

import useModal from '@/hooks/useModal'
import Button, { Props as ButtonProps } from './Button'
import SignUpModal from './SignUpModal'

type Props = Omit<ButtonProps, 'type'>

const SignUpButton = ({ onClick, ...props }: Props) => {
  const { open } = useModal('signIn')

  return (
    <>
      <Button
        {...props}
        onClick={(e) => {
          if (onClick) onClick(e)

          open()
        }}
      />
      <SignUpModal />
    </>
  )
}

export default SignUpButton
