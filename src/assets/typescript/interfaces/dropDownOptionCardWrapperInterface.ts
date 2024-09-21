export default interface DropDownOptionCardWrapperInterface {
  isSelectValueDropdownShown: boolean;
  invalidValue: boolean;
  selectedValue: number;
  setIsSelectValueDropdownShown: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  selectedValueName?: string;
  showDropdown: boolean;
}
