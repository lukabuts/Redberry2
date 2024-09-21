import VectorIcon from "../Icons/VectorIcon";

const ValidationCard = ({
  isError,
  validationMsg,
  valueEntered,
}: {
  isError: boolean;
  validationMsg: string;
  valueEntered?: string | number | File | null;
}) => {
  return (
    <div className="flex gap-1 items-center mt-2">
      <VectorIcon
        stroke={isError ? "#F93B1D" : valueEntered ? "#45a849" : "#021526"}
      />
      <span
        className={`text-sm ${
          isError
            ? "text-errColor"
            : valueEntered
              ? "text-successColor"
              : "text-deepBlue"
        }`}
      >
        {validationMsg}
      </span>
    </div>
  );
};

export default ValidationCard;
