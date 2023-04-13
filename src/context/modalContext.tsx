import { useState, createContext } from "react";
import { type ModalProps as TradeCryptoProps } from "@/components/TradeCryptoModal";

export type Modal = ModalType["name"];

export type ModalArguments = {
  signIn: undefined;
  signUp: undefined;
  addCrypto: undefined;
  tradeCrypto: TradeCryptoProps;
};

export type ModalType = {
  [K in keyof ModalArguments]: { name: K; args: ModalArguments[K] };
}[keyof ModalArguments];

export const ModalContext = createContext<{
  currentOpenModal: ModalType | null;
  openModal: (modal: ModalType) => void;
  closeModal: (modal: Modal) => void;
}>({
  currentOpenModal: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  openModal: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  closeModal: () => {},
});

export const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openModal, setOpenModal] = useState<ModalType | null>(null);

  return (
    <ModalContext.Provider
      value={{
        currentOpenModal: openModal,
        openModal: (modal) => {
          setOpenModal(modal);
        },
        closeModal: (modal) => {
          setOpenModal((prev) => (prev?.name === modal ? null : prev));
        },
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
