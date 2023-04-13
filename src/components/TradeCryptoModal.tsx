import useModal from "@/hooks/useModal";
import { type Asset, type WalletEntry } from "@prisma/client";

export type ModalProps = {
  entry: WalletEntry & { asset: Asset };
};

const TradeCryptoModal = () => {
  // TODO - Build modal
  const { isOpen, close, args } = useModal("tradeCrypto");

  console.log(args);

  if (isOpen) {
    const x = args;
  }

  return null;
};

export default TradeCryptoModal;
