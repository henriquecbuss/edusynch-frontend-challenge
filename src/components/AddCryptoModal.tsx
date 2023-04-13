'use client'

import useModal from '@/hooks/useModal'
import * as Modal from './Modal'
import { Form, Formik } from 'formik'
import { Asset } from '@/utils/coinapi'
import Image from 'next/image'
import Icons from './Icons'
import Input from './Input'
import Button from './Button'
import clsx from 'clsx'
import ListboxField from './ListboxField'

type Props = {
  availableAssets: Asset[]
}

const AddCryptoModal = ({ availableAssets }: Props) => {
  const { isOpen, close } = useModal('addCrypto')

  return (
    <Modal.Root isOpen={isOpen} close={close}>
      <Modal.Title as="h2" className="font-bold">
        Add Crypto
      </Modal.Title>
      <Formik
        initialValues={{
          amount: '',
          asset: null,
        }}
        onSubmit={({ amount, asset }, { setFieldError, setSubmitting }) => {
          if (asset === null) {
            setFieldError('asset', 'You must select an asset')
            setSubmitting(false)
            return
          }

          const numberAmount = parseInt(amount)

          if (isNaN(numberAmount)) {
            setFieldError('amount', 'You must enter a valid number')
            setSubmitting(false)
            return
          }

          if (numberAmount <= 0) {
            setFieldError('amount', 'You must enter a number bigger than 0')
            setSubmitting(false)
            return
          }

          // TODO - add crypto to db
        }}
      >
        {({ isSubmitting }) => (
          <Form className="mt-6">
            <ListboxField
              name="asset"
              options={availableAssets}
              optionToKey={(asset) => asset.id}
              disabled={isSubmitting}
              RenderButton={({ open, value }) => (
                <>
                  {!value && (
                    <span className="text-label opacity-[0.55]">Choose</span>
                  )}
                  {value !== null && <AssetOption asset={value} />}
                  <Icons.ChevronDown
                    className={clsx(
                      '!fill-secondary-300 w-4 transition-transform',
                      {
                        '!fill-primary rotate-180': open,
                      }
                    )}
                  />
                </>
              )}
              RenderOption={({ value }) => <AssetOption asset={value} />}
            />

            <Input
              type="numeric"
              name="amount"
              placeholder="0,00"
              required
              className="mt-4"
              disabled={isSubmitting}
            />
            <Button
              className="w-full mt-4 py-3"
              type="submit"
              disabled={isSubmitting}
            >
              Add Crypto
            </Button>
          </Form>
        )}
      </Formik>
    </Modal.Root>
  )
}

const AssetOption = ({ asset }: { asset: Asset }) => (
  <div className="flex items-center text-label">
    <Image alt="" width={16} height={16} src={asset.icon} />
    <span className="ml-2">{asset.name}</span>
    <span className="ml-1 text-secondary">{asset.id}</span>
  </div>
)

export default AddCryptoModal
