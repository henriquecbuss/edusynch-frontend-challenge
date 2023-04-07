import { ModalContext, Modal } from '@/context/modalContext'
import { useContext } from 'react'

const useModal = (
  modal: Modal
): {
  isOpen: boolean
  open: () => void
  close: () => void
} => {
  const { currentOpenModal, openModal, closeModal } = useContext(ModalContext)

  return {
    isOpen: currentOpenModal === modal,
    open: () => openModal(modal),
    close: () => closeModal(modal),
  }
}

export default useModal
