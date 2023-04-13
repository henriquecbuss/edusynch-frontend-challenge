import {
  ModalContext,
  type Modal,
  type ModalArguments,
} from "@/context/modalContext";
import { useContext } from "react";

type UseModalOpen<T extends Modal> = ModalArguments[T] extends undefined
  ? () => void
  : (args: ModalArguments[T]) => void;

const useModal = <T extends Modal>(
  modal: T
): {
  isOpen: boolean;
  open: UseModalOpen<T>;
  args: ModalArguments[T] | undefined;
  close: () => void;
} => {
  const { currentOpenModal, openModal, closeModal } = useContext(ModalContext);

  const isOpen = currentOpenModal?.name === modal;

  const args = isOpen ? currentOpenModal.args : undefined;

  return {
    isOpen: isOpen,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    args,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    open: (...a: any[]) =>
      openModal({
        name: modal,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        args: a[0],
      }),
    close: () => closeModal(modal),
  };
};

export default useModal;
