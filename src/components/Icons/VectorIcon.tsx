const VectorIcon = ({ stroke }: { stroke: string }) => {
  return (
    <svg
      width="12"
      height="11"
      viewBox="0 0 12 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 1.40918L4.125 9.591L1 5.87199"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default VectorIcon;
