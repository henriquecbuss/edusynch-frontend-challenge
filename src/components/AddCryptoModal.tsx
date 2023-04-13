'use client'

import useModal from '@/hooks/useModal'
import * as Modal from './Modal'
import {
  ErrorMessage,
  Field,
  FieldProps,
  Form,
  Formik,
  FormikFormProps,
  FormikProps,
  useField,
} from 'formik'
import { Asset } from '@/utils/coinapi'
import { Transition, Listbox } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Image from 'next/image'
import Icons from './Icons'
import Input from './Input'
import Button from './Button'
import FormError from './FormError'

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
        {({ isSubmitting, errors, touched }) => (
          <Form className="mt-6">
            <Field
              component={CryptoInput}
              availableAssets={availableAssets}
              name="asset"
              required
            />
            <FormError show={!!errors.asset && !!touched.asset}>
              {errors.asset}
            </FormError>
            <Input
              type="numeric"
              name="amount"
              placeholder="0,00"
              required
              className="mt-4"
              disabled={isSubmitting}
            />
            <Button className="w-full mt-4 py-3" type="submit">
              Add Crypto
            </Button>
          </Form>
        )}
      </Formik>
    </Modal.Root>
  )
}

const CryptoInput = ({
  field,
  form,
  availableAssets,
}: FieldProps<Asset | null> & {
  availableAssets: Asset[]
}) => {
  return (
    <div className="relative">
      <Listbox
        value={field.value}
        onChange={(v) => {
          form.setFieldValue(field.name, v)
        }}
      >
        <Listbox.Button className="flex items-center w-full justify-between border border-secondary-300 rounded-md p-4">
          {!field.value && (
            <span className="text-label opacity-[0.55]">Choose</span>
          )}
          {field.value !== null && <AssetOption asset={field.value} />}
          <Icons.ChevronDown className="!fill-secondary-300 w-4" />
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition ease-in duration-100 origin-top"
          enterFrom="opacity-0 scale-90"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100 origin-top"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-90"
        >
          <Listbox.Options className="absolute top-full mt-2 inset-x-0 max-h-60 overflow-auto bg-white border border-secondary-300 rounded-md isolate z-10">
            {availableAssets.map((asset) => (
              <Listbox.Option
                key={asset.id}
                value={asset}
                className="border-b last:border-none border-secondary-300 flex items-center justify-between p-4 hover:bg-secondary-200 transition-colors cursor-pointer"
              >
                <AssetOption asset={asset} />
                <Icons.ChevronDown className="-rotate-90 w-3 h-3 !fill-secondary-300" />
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
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
