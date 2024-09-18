import { useEffect } from "react";
import ContactInfoCardInterface from "../../assets/typescript/interfaces/contactInfoCardInterface";
import ValidationCard from "../AddListingCards/ValidationCard";
import LabelCard from "../TitleCards/LabelCard";

const ContactInfoCard = ({
  agentEmail,
  setagentEmail,
  invalidAgentEmail,
  setInvalidAgentEmail,
  agentMobileNumber,
  setAgentMobileNumber,
  invalidAgentMobileNumber,
  setInvalidAgentMobileNumber,
  numberStartsWithFive,
  setNumberStartsWithFive,
}: ContactInfoCardInterface) => {
  // Validate Email
  useEffect(() => {
    if (
      !agentEmail.endsWith("@redberry.ge") ||
      agentEmail.split(" ").length > 1
    ) {
      setInvalidAgentEmail(true);
    } else {
      setInvalidAgentEmail(false);
    }
  }, [agentEmail]);

  // Validate Mobile Number
  useEffect(() => {
    const numericValue = Number(agentMobileNumber);
    if (
      isNaN(numericValue) ||
      agentMobileNumber.trim().length !== 9 ||
      numericValue < 0
    ) {
      setInvalidAgentMobileNumber(true);
    } else {
      setInvalidAgentMobileNumber(false);
    }

    if (agentMobileNumber.startsWith("5")) {
      setNumberStartsWithFive(true);
    } else {
      setNumberStartsWithFive(false);
    }
  }, [agentMobileNumber]);

  return (
    <>
      <div className="flex-1">
        <div className="flex flex-col gap-1">
          <LabelCard HTMLfor="agentEmail">ელ-ფოსტა *</LabelCard>
          <input
            required
            type="email"
            className={`border px-1 py-1.5 text-sm rounded-md focus:outline-none ${
              invalidAgentEmail && agentEmail.trim()
                ? "border-errColor"
                : agentEmail.trim()
                ? "border-successColor"
                : "border-slateGray"
            }`}
            id="agentEmail"
            onChange={(e) => {
              setagentEmail(e.target.value);
            }}
            value={agentEmail}
          />
        </div>
        <ValidationCard
          isError={invalidAgentEmail && !!agentEmail.trim()}
          validationMsg="გამოიყენეთ @redberry.ge ფოსტა"
          valueEntered={agentEmail.trim()}
        />
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-1">
          <LabelCard HTMLfor="agentMobileNumber">ტელეფონის ნოომერი *</LabelCard>
          <input
            required
            type="number"
            min={0}
            maxLength={9}
            className={`border px-1 py-1.5 text-sm rounded-md focus:outline-none ${
              (invalidAgentMobileNumber || !numberStartsWithFive) &&
              agentMobileNumber.trim()
                ? "border-errColor"
                : agentMobileNumber.trim()
                ? "border-successColor"
                : "border-slateGray"
            }`}
            id="agentMobileNumber"
            onChange={(e) => {
              setAgentMobileNumber(e.target.value);
            }}
            value={agentMobileNumber}
          />
        </div>
        <ValidationCard
          isError={invalidAgentMobileNumber && !!agentMobileNumber.trim()}
          validationMsg="მხოლოდ ცხრანიშნა რიცხვი"
          valueEntered={agentMobileNumber.trim()}
        />
        <ValidationCard
          isError={!numberStartsWithFive && !!agentMobileNumber.trim()}
          validationMsg="უნდა იწყებოდეს 5-ით"
          valueEntered={agentMobileNumber.trim()}
        />
      </div>
    </>
  );
};

export default ContactInfoCard;
