import { useEffect } from "react";
import LabelCard from "../TitleCards/LabelCard";
import ValidationCard from "../AddListingCards/ValidationCard";
import AgentFullNameInterface from "../../assets/typescript/interfaces/agentFullNameCardInterface";

const AgentFullNameCard = ({
  agentName,
  setagentName,
  invalidAgentName,
  setInvalidAgentName,
  agentSurname,
  setAgentSurname,
  invalidAgentSurname,
  setInvalidAgentSurname,
}: AgentFullNameInterface) => {
  // Handle Invalid Name
  useEffect(() => {
    handleInvalidFullName(agentName, setInvalidAgentName);
  }, [agentName]);

  // Handle Invalid Surname
  useEffect(() => {
    handleInvalidFullName(agentSurname, setInvalidAgentSurname);
  }, [agentSurname]);

  // Handle Invalid First and Last Names
  function handleInvalidFullName(
    value: string,
    setInvalidValue: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    if (value.trim().length < 2 && value.trim().length > 0) {
      setInvalidValue(true);
    } else {
      setInvalidValue(false);
    }
  }
  return (
    <>
      <div className="flex-1">
        <div className="flex flex-col gap-1">
          <LabelCard HTMLfor="agentName">სახელი *</LabelCard>
          <input
            required
            type="text"
            className={`border px-1 py-1.5 text-sm rounded-md focus:outline-none ${
              invalidAgentName
                ? "border-errColor"
                : agentName.trim()
                ? "border-successColor"
                : "border-slateGray"
            }`}
            id="agentName"
            onChange={(e) => {
              setagentName(e.target.value);
            }}
            value={agentName}
          />
        </div>
        <ValidationCard
          isError={invalidAgentName}
          validationMsg="მინიმუმ ორი სიმბოლო"
          valueEntered={agentName.trim()}
        />
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-1">
          <LabelCard HTMLfor="agentSurname">გვარი *</LabelCard>
          <input
            required
            type="text"
            className={`border px-1 py-1.5 text-sm rounded-md focus:outline-none ${
              invalidAgentSurname
                ? "border-errColor"
                : agentSurname.trim()
                ? "border-successColor"
                : "border-slateGray"
            }`}
            id="agentSurname"
            onChange={(e) => {
              setAgentSurname(e.target.value);
            }}
            value={agentSurname}
          />
        </div>
        <ValidationCard
          isError={invalidAgentSurname}
          validationMsg="მინიმუმ ორი სიმბოლო"
          valueEntered={agentSurname.trim()}
        />
      </div>
    </>
  );
};

export default AgentFullNameCard;
