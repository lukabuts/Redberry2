export function validateString(
  value: string,
  setInvalidValue: React.Dispatch<React.SetStateAction<boolean>>,
  minChars: number
) {
  if (value.trim().length < minChars) {
    setInvalidValue(true);
  } else {
    setInvalidValue(false);
  }
}
