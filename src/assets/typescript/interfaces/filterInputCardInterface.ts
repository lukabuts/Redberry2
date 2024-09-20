export default interface FilterInputInterface {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  type: "price" | "area";
  placeHolder: string;
  isError: boolean;
}
