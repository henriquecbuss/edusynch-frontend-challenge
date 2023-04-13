const Envelope = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      className={className}
    >
      <path
        fill="#E0DEEA"
        fillRule="evenodd"
        d="M1.23 3.913c0-.567.46-1.025 1.026-1.025h11.488c.566 0 1.025.458 1.025 1.025v8.175c0 .566-.458 1.025-1.025 1.025H2.256a1.025 1.025 0 0 1-1.025-1.026V3.913Zm1.026 10.43h11.488A2.256 2.256 0 0 0 16 12.088V3.913a2.256 2.256 0 0 0-2.256-2.256H2.256A2.256 2.256 0 0 0 0 3.913v8.174a2.256 2.256 0 0 0 2.256 2.257Zm1.958-9.332a.615.615 0 0 0-.633 1.055l4.102 2.462a.615.615 0 0 0 .634 0l4.102-2.462a.615.615 0 0 0-.633-1.055L8 7.282 4.214 5.011Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default Envelope
