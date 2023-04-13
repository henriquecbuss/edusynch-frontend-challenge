import { Disclosure, Transition } from "@headlessui/react";
import Image from "next/image";
import ChevronDown from "./Icons/ChevronDown";
import clsx from "clsx";
import FormattedNumber from "./FormattedNumber";
import { Asset } from "@/utils/coinapi";

type Props = {
  asset: Asset;
  className?: string;
};

const CryptoDisclosure = ({ asset, className }: Props) => {
  return (
    <Disclosure>
      <Disclosure.Button
        className={clsx("flex items-center gap-2 p-4", className)}
      >
        <Image src={asset.icon} width={24} height={24} alt="" />
        <p className="text-small-label">
          {asset.name} <span className="text-secondary">{asset.id}</span>
        </p>
        <ChevronDown className="ml-auto h-4 w-4 !fill-primary-300 transition-transform ui-open:rotate-180" />
      </Disclosure.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Disclosure.Panel className="border-t border-secondary-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-small-label text-secondary">Price</span>
            <FormattedNumber
              number={asset.priceUsd}
              options={{
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-small-label text-secondary">Change</span>
            <FormattedNumber
              number={asset.brlRateChangePercentage}
              className={clsx({
                "text-tertiary-700": asset.brlRateChangePercentage > 0,
                "text-quaternary-700": asset.brlRateChangePercentage < 0,
              })}
              options={{
                signDisplay: "always",
                style: "percent",
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }}
            />
          </div>
        </Disclosure.Panel>
      </Transition>
    </Disclosure>
  );
};

export default CryptoDisclosure;
