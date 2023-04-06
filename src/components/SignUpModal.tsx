import BrandName from './BrandName'
import Input from './Input'
import Link from 'next/link'
import Button from './Button'
import * as Modal from './Modal'

type Props = {} & Modal.Props

const SignInModal = ({ ...modalProps }: Props) => {
  return (
    <Modal.Root {...modalProps}>
      <Modal.Title>
        Sign up to <BrandName />
      </Modal.Title>

      <form
        onSubmit={() => {
          // TODO - Handle sign up
        }}
        className="flex flex-col gap-6 mt-6"
      >
        <Input type="username" placeholder="Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm password" />

        {/* Checkbox */}

        <Button className="w-full py-3" type="submit">
          Sign up
        </Button>
      </form>

      <span className="text-small-label mt-6">
        <span className="hidden md:inline">Already have an account? </span>
        <button
          onClick={() => {
            // TODO - Handle sign up
          }}
          className="font-bold hover:underline"
        >
          Sign in to <BrandName />
        </button>
      </span>
    </Modal.Root>
  )
}

export default SignInModal
