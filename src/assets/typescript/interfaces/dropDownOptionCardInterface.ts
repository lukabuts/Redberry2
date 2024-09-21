import regionsType from "../types/regions";

export type DropDownOptionCardInterface = {
  value: regionsType;
  invalidValue: boolean;
  selectedValue: number;
  setSelectedValue: React.Dispatch<React.SetStateAction<number>>;
  setInvalidValue: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSelectValueDropdownShown: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};
