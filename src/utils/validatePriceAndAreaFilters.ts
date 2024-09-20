import { validateNumericValue } from "./validateNumericValues";

export function validatePriceAndArea(
  minValue: string,
  maxValue: string,
  setIsValueError: React.Dispatch<React.SetStateAction<boolean>>
) {
  validateNumericValue(minValue, setIsValueError);
  validateNumericValue(maxValue, setIsValueError);
  if (
    (Number(minValue) > Number(maxValue) ||
      Number(minValue) < 0 ||
      Number(maxValue) < 0) &&
    maxValue &&
    minValue
  ) {
    setIsValueError(true);
  }
}
