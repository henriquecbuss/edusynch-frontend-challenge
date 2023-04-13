import { useEffect, useState } from "react";
import Button from "./Button";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import CryptoDisclosure from "./CryptoDisclosure";
import CryptoRow from "./CryptoRow";
import clsx from "clsx";
import { type Asset } from "@prisma/client";

type Props = {
  assets: Asset[];
};

const TopCryptosViewMoreContainer = ({ assets }: Props) => {
  const [viewMore, setViewMore] = useState(false);
  const [smParent] = useAutoAnimate();
  const [mdParent, mdEnableAnimations] = useAutoAnimate();

  useEffect(() => {
    mdEnableAnimations(viewMore);
  }, [viewMore, mdEnableAnimations]);

  return (
    <>
      <div className="mt-4 flex flex-col md:hidden" ref={smParent}>
        {assets.slice(0, viewMore ? 10 : 4).map((asset) => (
          <CryptoDisclosure
            asset={asset}
            key={asset.id}
            className="even:bg-secondary-100"
          />
        ))}
      </div>

      <table className="mt-6 hidden w-full table-auto text-left md:table">
        <thead>
          <tr>
            <Th className="w-1/12">#</Th>
            <Th className="w-1/3">Crypto</Th>
            <Th className="w-1/3">Price</Th>
            <Th className="w-1/3">Change</Th>
            <Th>Trade</Th>
          </tr>
        </thead>
        <tbody ref={mdParent}>
          {assets.slice(0, viewMore ? 10 : 4).map((asset, index) => (
            <CryptoRow asset={asset} index={index + 1} key={asset.id} />
          ))}
        </tbody>
      </table>

      <Button
        variant="ghost"
        className="mx-auto mt-4 block text-primary"
        onClick={() => setViewMore((prev) => !prev)}
      >
        {viewMore ? "View less -" : "View more +"}
      </Button>
    </>
  );
};

const Th = ({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <th
      className={clsx(
        "px-6 py-4 text-label font-normal text-secondary",
        className
      )}
    >
      {children}
    </th>
  );
};

export default TopCryptosViewMoreContainer;
