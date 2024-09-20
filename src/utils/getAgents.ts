import axios from "axios";
import { agentsType } from "../assets/typescript/types/agentsType";

export function getAgents(
  setAgents: React.Dispatch<React.SetStateAction<agentsType[]>>,
  token: string
) {
  axios
    .get("https://api.real-estate-manager.redberryinternship.ge/api/agents", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setAgents(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
