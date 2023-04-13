import useModal from "@/hooks/useModal";
import * as Modal from "./Modal";
import { type Asset, type WalletEntry } from "@prisma/client";
import Image from "next/image";
import Icons from "./Icons";
import { Form, Formik } from "formik";
import ListboxField from "@/components/ListboxField";
import clsx from "clsx";
import Input from "./Input";
import Button from "./Button";
import { api } from "@/utils/api";

export type ModalProps = {
  entry: WalletEntry & { asset: Asset };
};

const TradeCryptoModal = () => {
  const { isOpen, close, args } = useModal("tradeCrypto");
  const { mutate: increaseEntry } = api.walletEntry.increase.useMutation();
  const { mutate: decreaseEntry } = api.walletEntry.decrease.useMutation();
  const { refetch: refetchUsdBalance } = api.walletEntry.usdBalance.useQuery(
    undefined,
    {
      enabled: false,
    }
  );
  const { refetch: refetchWalletEntries } = api.walletEntry.getAll.useQuery(
    undefined,
    {
      enabled: false,
    }
  );

  if (!args) {
    return null;
  }

  const { entry } = args;

  return (
    <Modal.Root isOpen={isOpen} close={close}>
      <Modal.Title as="h2" className="font-bold">
        Transfer Crypto
      </Modal.Title>
      <hr className="mt-4 text-secondary-200 lg:mt-6" />

      <div className="mt-4 flex items-center justify-between lg:mt-6">
        <span className="text-small-label text-secondary-400 lg:text-label">
          You are transferring
        </span>
        <div className="flex items-center text-label lg:text-base">
          <Image width={24} height={24} src={entry.asset.icon} alt="" />

          <span className="ml-2">{entry.asset.name}</span>
          <span className="ml-1 text-secondary">{entry.asset.id}</span>
        </div>
      </div>

      <Formik
        initialValues={{
          mode: null as "in" | "out" | null,
          quantity: "",
        }}
        onSubmit={({ mode, quantity }, { setFieldError, setSubmitting }) => {
          if (mode === null) {
            setFieldError("mode", "You must choose either in or out");
            setSubmitting(false);
          }

          const numberQuantity = parseInt(quantity);

          if (isNaN(numberQuantity)) {
            setFieldError("quantity", "You must enter a valid number");
            setSubmitting(false);
            return;
          }

          if (numberQuantity <= 0) {
            setFieldError("quantity", "You must enter a number bigger than 0");
            setSubmitting(false);
            return;
          }

          if (mode === "in") {
            increaseEntry(
              {
                amount: numberQuantity,
                assetId: entry.asset.id,
              },
              {
                onSettled: () => {
                  setSubmitting(false);
                },
                onSuccess: () => {
                  void refetchUsdBalance();
                  void refetchWalletEntries();
                  close();
                },
                onError: (error) => {
                  setFieldError("quantity", error.message);
                },
              }
            );
            return;
          }

          if (mode === "out") {
            decreaseEntry(
              {
                amount: numberQuantity,
                assetId: entry.asset.id,
              },
              {
                onSettled: () => {
                  setSubmitting(false);
                },
                onSuccess: () => {
                  void refetchUsdBalance();
                  void refetchWalletEntries();
                  close();
                },
                onError: (error) => {
                  setFieldError("quantity", error.message);
                },
              }
            );
            return;
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="mt-4 lg:mt-6">
            <ListboxField
              name="mode"
              options={["in", "out"]}
              optionToKey={(option) => option}
              disabled={isSubmitting}
              RenderButton={({ open, value }) => (
                <>
                  {!value && (
                    <span className="text-label opacity-[0.55]">Choose</span>
                  )}
                  {value === "in" && (
                    <span className="text-label">Transfer in</span>
                  )}
                  {value === "out" && (
                    <span className="text-label">Transfer out</span>
                  )}
                  <Icons.ChevronDown
                    className={clsx(
                      "w-4 !fill-secondary-300 transition-transform",
                      {
                        "rotate-180 !fill-primary": open,
                      }
                    )}
                  />
                </>
              )}
              RenderOption={({ value }) => {
                if (value === "in") {
                  return <span>Transfer in</span>;
                }
                if (value === "out") {
                  return <span>Transfer out</span>;
                }

                return null;
              }}
            />

            <Input
              type="numeric"
              name="quantity"
              placeholder="0,00"
              required
              className="mt-4 lg:mt-6"
              disabled={isSubmitting}
            />
            <Button
              className="mt-4 w-full py-3 lg:mt-6"
              type="submit"
              disabled={isSubmitting}
            >
              Transfer Crypto
            </Button>
          </Form>
        )}
      </Formik>
    </Modal.Root>
  );
};

export default TradeCryptoModal;
