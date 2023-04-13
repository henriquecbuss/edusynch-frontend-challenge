import clsx from "clsx";

const ChevronDown = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("fill-secondary-400", className)}
      viewBox="0 0 8 8"
    >
      <path
        fillRule="evenodd"
        d="M.185 1.853a.628.628 0 0 1 .893 0L4 4.797l2.922-2.944a.628.628 0 0 1 .893 0 .64.64 0 0 1 0 .9L4.447 6.147a.628.628 0 0 1-.894 0L.185 2.753a.64.64 0 0 1 0-.9Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default ChevronDown;
