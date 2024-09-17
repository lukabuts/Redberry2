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
}: ContactInfoCardInterface) => {
  // Validate Email
  useEffect(() => {
    if (
      (!agentEmail.endsWith("@redberry.ge") ||
        agentEmail.split(" ").length > 1) &&
      agentEmail.trim().length > 0
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
      (isNaN(numericValue) ||
        agentMobileNumber.trim().length !== 9 ||
        numericValue < 0) &&
      agentMobileNumber.trim().length > 0
    ) {
      setInvalidAgentMobileNumber(true);
    } else {
      setInvalidAgentMobileNumber(false);
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
              invalidAgentEmail
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
          isError={invalidAgentEmail}
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
              invalidAgentMobileNumber
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
          isError={invalidAgentMobileNumber}
          validationMsg="მხოლოდ ცხრანიშნა რიცხვი"
          valueEntered={agentMobileNumber.trim()}
        />
      </div>
    </>
  );
};

export default ContactInfoCard;
