'use client'

import useModal from '@/hooks/useModal'
import Button, { Props as ButtonProps } from './Button'

type Props = Omit<ButtonProps, 'type'>

const SignUpButton = ({ onClick, ...props }: Props) => {
  const { open } = useModal('signUp')

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

export default SignUpButton
