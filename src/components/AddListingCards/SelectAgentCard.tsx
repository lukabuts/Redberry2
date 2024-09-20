import { useContext, useEffect, useState } from "react";
import SelectedAgentInterface from "../../assets/typescript/interfaces/selectedAgentCardInterface";
import {
  IsAddAgentShownContext,
  SetIsAddAgentShownContext,
  TokenContext,
} from "../../App";
import { agentsType } from "../../assets/typescript/types/agentsType";
import circlePlusIcon from "../../assets/images/plus_circle.svg";
import dropDownIcon from "../../assets/images/dropdown.svg";
import { getAgents } from "../../utils/getAgents";

const SelectAgentCard = ({
  selectedAgent,
  setSelectedAgent,
  invalidAgent,
  setInvalidAgent,
}: SelectedAgentInterface) => {
  const token = useContext(TokenContext);
  const [agents, setAgents] = useState<agentsType[]>([]);
  // Selected Agent's full name
  const [selectedAgentFullName, setSelectedAgentFullName] = useState("");
  // is select agent dropdown shown
  const [isSelectAgentDropdownShown, setIsSelectAgentDropdownShown] =
    useState(false);

  // setIsAddAgentShown
  const isAddAgentShown = useContext(IsAddAgentShownContext);
  const setIsAddAgentShown = useContext(SetIsAddAgentShownContext);
  // Get Agents
  useEffect(() => {
    getAgents(setAgents, token);
  }, [isAddAgentShown, token]);

  // Set Agent full name
  useEffect(() => {
    const agent = agents.find((agent) => agent.id === selectedAgent);
    setSelectedAgentFullName(agent?.name + " " + agent?.surname);
  }, [agents, selectedAgent]);

  return (
    <>
      <div className="mb-5">
        <h2 className=" text-deepBlue text-base font-semibold">აგენტი *</h2>
      </div>
      <div
        className={`border text-sm rounded-md focus:outline-none bg-transparent cursor-pointer disabled:cursor-default  ${
          invalidAgent
            ? "border-errColor"
            : selectedAgent
              ? "border-successColor"
              : "border-slateGray"
        }`}
      >
        {/* Show Selected Agent Full Name */}
        <div
          className={`h-9 px-1 flex items-center rounded-t-md justify-between w-full bg-white hover:bg-softGray ${isSelectAgentDropdownShown ? "rounded-t-md border-b" : "rounded-md"} ${
            invalidAgent
              ? "border-errColor text-errColor"
              : selectedAgent
                ? "border-successColor"
                : "border-slateGray"
          }`}
          onClick={() => {
            setIsSelectAgentDropdownShown(!isSelectAgentDropdownShown);
          }}
        >
          <span>
            {selectedAgent ? selectedAgentFullName : "აირჩიე ან დაამატე აგენტი"}
          </span>
          <div className=" w-3.5 h-3.5">
            <img
              loading="lazy"
              src={dropDownIcon}
              className={`w-3.5 h-3.5 transition-transform ${isSelectAgentDropdownShown ? "rotate-180" : "rotate-0"}`}
              alt="Dropdown"
            />
          </div>
        </div>
        {/* Show Agents */}
        <div
          className={`transition-all overflow-hidden rounded-b-md ${isSelectAgentDropdownShown ? "h-36 overflow-y-auto" : "h-0 overflow-y-clip"}`}
        >
          {/* Show Add Agent Form */}
          <button
            onClick={() => {
              setIsAddAgentShown(true);
            }}
            className="flex items-center gap-1 h-9 px-1 hover:bg-softGray w-full"
            type="button"
          >
            <img src={circlePlusIcon} alt="Add" className="w-6 h-6" />
            <span>დაამატე აგენტი</span>
          </button>
          {/* Show Avaliable Agents */}
          <ul>
            {agents.map((agent) => (
              <li
                key={agent.id}
                className={`border-t hover:bg-softGray ${
                  invalidAgent
                    ? "border-errColor"
                    : selectedAgent
                      ? "border-successColor"
                      : "border-slateGray"
                }`}
              >
                <button
                  className="w-full h-9 px-1 text-start"
                  onClick={() => {
                    setSelectedAgent(agent.id);
                    setSelectedAgentFullName(agent.name + " " + agent.surname);
                    setInvalidAgent(false);
                    setIsSelectAgentDropdownShown(false);
                  }}
                  type="button"
                >
                  {agent.name} {agent.surname}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SelectAgentCard;
