import { DropDownOptionCardInterface } from "../../assets/typescript/interfaces/dropDownOptionCardInterface";

const DropDownOptionCard = ({
  value,
  invalidValue,
  selectedValue,
  setSelectedValue,
  setInvalidValue,
  setIsSelectValueDropdownShown,
  children,
}: DropDownOptionCardInterface) => {
  return (
    <li
      className={`border-b hover:bg-softGray last:border-b-0 ${
        invalidValue
          ? "border-errColor"
          : selectedValue
            ? "border-successColor"
            : "border-slateGray"
      }`}
    >
      <button
        className="w-full h-10 px-2 text-start"
        onClick={() => {
          setSelectedValue(value.id);
          setInvalidValue(false);
          setIsSelectValueDropdownShown(false);
        }}
        type="button"
      >
        {children}
      </button>
    </li>
  );
};

export default DropDownOptionCard;
