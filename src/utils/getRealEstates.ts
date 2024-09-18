import axios from "axios";
import { realEstateType } from "../assets/typescript/types/realEstateType";

export function getRealEstates(
  setIsRealEstatesLoading: React.Dispatch<React.SetStateAction<boolean>>,
  token: string,
  setRealEstates: React.Dispatch<React.SetStateAction<realEstateType[]>>,
  setRealEstatesError: React.Dispatch<React.SetStateAction<string>>
) {
  setIsRealEstatesLoading(true);
  axios
    .get(
      "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      setRealEstates(res.data);
      console.log("Getting Real Estates");
    })
    .catch((err) => {
      console.log("Error:", err);
      setRealEstatesError(err.message);
    })
    .finally(() => {
      setIsRealEstatesLoading(false);
    });
}
