const Trade = (props: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      stroke="#8C8A97"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 4 6.5 5.5m0-3L8 4M6 4a3 3 0 0 0-3 3m3-3h2m8 16 1.5-1.5m0 3L16 20m2 0a3 3 0 0 0 3-3m-3 3h-2"
    />
    <path
      stroke="#8C8A97"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.5 20c3.025 0 5.5-2.475 5.5-5.5S12.525 9 9.5 9 4 11.475 4 14.5c0 1.234.417 2.373 1.11 3.292A5.49 5.49 0 0 0 9.5 20Z"
      clipRule="evenodd"
    />
    <path
      stroke="#8C8A97"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.389 5.611c2.139 2.14 2.139 5.64 0 7.778a4.66 4.66 0 0 1-.547.453m.547-8.231c-2.139-2.139-5.639-2.139-7.778 0-.17.17-.316.355-.458.542"
    />
  </svg>
);
export default Trade;
