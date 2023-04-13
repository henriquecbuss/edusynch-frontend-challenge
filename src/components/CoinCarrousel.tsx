import clsx from "clsx";
import FormattedNumber from "./FormattedNumber";
import { useEffect, useRef } from "react";
import { type Asset } from "@prisma/client";

type Props = {
  className?: string;
  assets: Asset[];
};

const CoinCarrousel = ({ className, assets }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstContainerRef = useRef<HTMLDivElement>(null);
  const secondContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const speed = 0.5;

    const scroll = (
      ref: React.RefObject<HTMLDivElement>,
      {
        until,
        andThen,
      }: {
        until: (container: HTMLDivElement) => boolean;
        andThen: (container: HTMLDivElement) => void;
      }
    ) => {
      const container = ref.current;
      if (!container || container.clientWidth === 0) {
        return;
      }
      container.scrollLeft += speed;

      if (until(container)) {
        andThen(container);
        return;
      }

      requestAnimationFrame(() => scroll(ref, { until, andThen }));
    };

    const scrollFirstContainer = () => {
      scroll(firstContainerRef, {
        until: (firstContainer) =>
          firstContainer.scrollLeft + firstContainer.clientWidth >=
          firstContainer.scrollWidth - speed,
        andThen: scrollOuterContainer,
      });
    };

    const scrollOuterContainer = (firstContainer: HTMLDivElement) => {
      scroll(containerRef, {
        until: (outerContainer) => {
          const secondContainer = secondContainerRef.current;

          if (!secondContainer) {
            return true;
          }

          const outerBoundingRect = outerContainer.getBoundingClientRect();
          const secondBoundingRect = secondContainer.getBoundingClientRect();

          return (
            Math.abs(outerBoundingRect.left - secondBoundingRect.left) < speed
          );
        },
        andThen: (outerContainer) => {
          firstContainer.scrollLeft = 0;
          outerContainer.scrollLeft = 0;
          scrollFirstContainer();
        },
      });
    };

    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(scrollFirstContainer);
    }
  }, []);

  return (
    <div className={clsx("mx-2 px-4 py-[5px]", className)}>
      <div className="coin-carrousel-opacity-mask overflow-hidden">
        <div
          ref={containerRef}
          className="flex items-center gap-6 overflow-hidden"
        >
          <div
            className="flex w-full flex-shrink-0 items-center gap-6 overflow-hidden motion-reduce:overflow-x-auto"
            ref={firstContainerRef}
          >
            {assets.map((asset) => (
              <Coin coin={asset} key={asset.id} />
            ))}
          </div>
          <div
            aria-hidden
            className="flex w-full flex-shrink-0 items-center gap-6 overflow-hidden motion-reduce:hidden"
            ref={secondContainerRef}
          >
            {assets.map((asset) => (
              <Coin coin={asset} key={asset.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Coin = ({ coin }: { coin: Asset }) => {
  return (
    <div className="flex flex-shrink-0 items-center gap-2 text-small-label">
      <span className="text-secondary-800">{coin.id}</span>
      <span>
        <FormattedNumber
          number={coin.priceBrl}
          options={{ style: "currency", currency: "BRL" }}
        />
      </span>
      <span
        className={clsx({
          "text-tertiary-700": coin.brlRateChangeAbsolute > 0,
          "text-quaternary-700": coin.brlRateChangeAbsolute < 0,
        })}
      >
        <FormattedNumber
          number={coin.brlRateChangeAbsolute}
          options={{
            signDisplay: "always",
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          }}
        />
      </span>
    </div>
  );
};

export default CoinCarrousel;
