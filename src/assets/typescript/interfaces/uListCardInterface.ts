export default interface UListCardInterface {
  type: "price" | "area";
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
