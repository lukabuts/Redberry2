import gelIcon from "../../assets/images/gel.svg";
import FilterInputInterface from "../../assets/typescript/interfaces/filterInputCardInterface";

const FilterInputCard = ({
  type,
  value,
  setValue,
  placeHolder,
  isError,
}: FilterInputInterface) => {
  return (
    <div
      className={`relative flex-1 border rounded-md overflow-hidden ${
        isError && value.length > 0
          ? "border-errColor"
          : value.length > 0
            ? "border-successColor"
            : "border-slateGray"
      }`}
    >
      <input
        type="number"
        placeholder={placeHolder}
        className="px-2.5 py-3 mr-2 text-sm focus:outline-none"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <div className="absolute top-1/2 right-2 -translate-y-1/2">
        {type === "price" ? (
          <img src={gelIcon} alt="Gel" />
        ) : (
          <span className="text-slateGray">
            მ<sup>2</sup>
          </span>
        )}
      </div>
    </div>
  );
};

export default FilterInputCard;
