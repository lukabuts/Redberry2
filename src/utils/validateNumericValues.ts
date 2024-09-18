export function validateNumericValue(
  value: string,
  setInvalidValue: React.Dispatch<React.SetStateAction<boolean>>
) {
  const numericValue = Number(value);

  if (isNaN(numericValue) || numericValue <= 0 || !value) {
    setInvalidValue(true);
  } else {
    setInvalidValue(false);
  }
}
