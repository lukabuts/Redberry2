import dropDownIcon from "../../assets/images/dropdown.svg";
import DropDownOptionCardWrapperInterface from "../../assets/typescript/interfaces/dropDownOptionCardWrapperInterface";

const DropDownOptionCardWrapper = ({
  invalidValue,
  selectedValue,
  isSelectValueDropdownShown,
  setIsSelectValueDropdownShown,
  children,
  selectedValueName,
  showDropdown,
}: DropDownOptionCardWrapperInterface) => {
  return (
    <div
      className={`relative border text-sm rounded-md focus:outline-none bg-transparent disabled:cursor-default ${showDropdown && "cursor-pointer"}  ${
        invalidValue
          ? "border-errColor"
          : selectedValue
            ? "border-successColor"
            : "border-slateGray"
      }`}
    >
      {/* Show Selected Value Full Name */}
      <div
        className={`h-10 px-2 flex items-center rounded-t-md justify-between w-full bg-white ${showDropdown && "hover:bg-softGray"} ${isSelectValueDropdownShown ? "rounded-t-md border-b" : "rounded-md"} ${
          invalidValue
            ? "border-errColor text-errColor"
            : selectedValue
              ? "border-successColor"
              : "border-slateGray"
        }`}
        onClick={() => {
          if (showDropdown) {
            setIsSelectValueDropdownShown(!isSelectValueDropdownShown);
          }
        }}
      >
        <span>{selectedValueName}</span>
        <div className=" w-3.5 h-3.5">
          <img
            loading="lazy"
            src={dropDownIcon}
            className={`w-3.5 h-3.5 transition-transform ${isSelectValueDropdownShown ? "rotate-180" : "rotate-0"}`}
            alt="Dropdown"
          />
        </div>
      </div>
      {/* Show Values */}
      <div
        className={`absolute bg-white w-full transition-all overflow-hidden rounded-b-md border-t-0 ${isSelectValueDropdownShown ? "max-h-40 overflow-y-auto border" : "max-h-0 overflow-y-clip"} ${
          invalidValue
            ? "border-errColor"
            : selectedValue
              ? "border-successColor"
              : "border-slateGray"
        }`}
      >
        <ul>{children}</ul>
      </div>
    </div>
  );
};

export default DropDownOptionCardWrapper;
