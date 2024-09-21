import { useContext, useEffect, useState } from "react";
import SelectedAgentInterface from "../../assets/typescript/interfaces/selectedAgentCardInterface";
import {
  IsAddAgentShownContext,
  SetIsAddAgentShownContext,
  TokenContext,
} from "../../App";
import { agentsType } from "../../assets/typescript/types/agentsType";
import circlePlusIcon from "../../assets/images/plus_circle.svg";
import { getAgents } from "../../utils/getAgents";
import DropDownOptionCardWrapper from "./DropDownOptionCardWrapper";
import DropDownOptionCard from "./DropDownOptionCard";

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
      {/* Show Selected Agent Full Name */}
      <DropDownOptionCardWrapper
        invalidValue={invalidAgent}
        selectedValue={selectedAgent}
        setIsSelectValueDropdownShown={setIsSelectAgentDropdownShown}
        isSelectValueDropdownShown={isSelectAgentDropdownShown}
        selectedValueName={
          selectedAgent ? selectedAgentFullName : "აირჩიე ან დაამატე აგენტი"
        }
        showDropdown={true}
      >
        {/* Show Add Agent Form */}
        <button
          onClick={() => {
            setIsAddAgentShown(true);
          }}
          className={`flex items-center gap-1 h-10 px-1 hover:bg-softGray w-full border-b ${
            invalidAgent
              ? "border-errColor"
              : selectedAgent
                ? "border-successColor"
                : "border-slateGray"
          }`}
          type="button"
        >
          <img src={circlePlusIcon} alt="Add" className="w-6 h-6" />
          <span>დაამატე აგენტი</span>
        </button>
        {/* Show Avaliable Agents */}
        {agents.map((agent) => (
          <DropDownOptionCard
            key={agent.id}
            value={agent}
            invalidValue={invalidAgent}
            setInvalidValue={setInvalidAgent}
            selectedValue={selectedAgent}
            setSelectedValue={setSelectedAgent}
            setIsSelectValueDropdownShown={setIsSelectAgentDropdownShown}
          >
            {agent.name} {agent.surname}
          </DropDownOptionCard>
        ))}
      </DropDownOptionCardWrapper>
    </>
  );
};

export default SelectAgentCard;
