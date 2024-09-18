import { useContext, useEffect, useState } from "react";
import SelectedAgentInterface from "../../assets/typescript/interfaces/selectedAgentCardInterface";
import axios from "axios";
import { TokenContext } from "../../App";
import { agentsType } from "../../assets/typescript/types/agentsType";

const SelectAgentCard = ({
  selectedAgent,
  setSelectedAgent,
  invalidAgent,
  setInvalidAgent,
}: SelectedAgentInterface) => {
  const token = useContext(TokenContext);
  const [agents, setAgents] = useState<agentsType[]>([]);
  // Get Agents
  useEffect(() => {
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
  }, [token]);
  return (
    <>
      <div className="mb-5">
        <h2 className=" text-deepBlue text-base font-semibold">აგენტი *</h2>
      </div>
      <div className="flex flex-col gap-5 w-1/2 pr-2.5">
        <select
          name="region"
          className={`border px-1 py-1.5 text-sm rounded-md focus:outline-none bg-transparent cursor-pointer disabled:cursor-default ${
            invalidAgent
              ? "border-errColor"
              : selectedAgent
              ? "border-successColor"
              : "border-slateGray"
          }`}
          onChange={(e) => {
            setSelectedAgent(Number(e.target.value));
            setInvalidAgent(false);
          }}
          value={selectedAgent}
          required
          id="region"
          disabled={agents.length === 0}
        >
          <option value="0">
            {agents.length === 0 && "თქვენ არ გყავთ აგენტი დარეგისტრირებული"}
          </option>
          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name} {agent.surname}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SelectAgentCard;
