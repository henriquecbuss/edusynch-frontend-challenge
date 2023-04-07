'use client'

import { useState, createContext } from 'react'

export type Modal = 'signIn' | 'signUp'

export const ModalContext = createContext<{
  currentOpenModal: Modal | null
  openModal: (modal: Modal) => void
  closeModal: (modal: Modal) => void
}>({
  currentOpenModal: null,
  openModal: () => {},
  closeModal: () => {},
})

export const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [openModal, setOpenModal] = useState<Modal | null>(null)

  return (
    <ModalContext.Provider
      value={{
        currentOpenModal: openModal,
        openModal: (modal) => {
          setOpenModal(modal)
        },
        closeModal: (modal) => {
          setOpenModal((prev) => (prev === modal ? null : prev))
        },
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
