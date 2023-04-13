import clsx from "clsx";

const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-lg shadow-[0px_8px_16px_rgba(0,0,0,0.1)]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
