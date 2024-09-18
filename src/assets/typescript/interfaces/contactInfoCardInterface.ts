export default interface ContactInfoCardInterface {
  agentEmail: string;
  setagentEmail: React.Dispatch<React.SetStateAction<string>>;
  invalidAgentEmail: boolean;
  setInvalidAgentEmail: React.Dispatch<React.SetStateAction<boolean>>;
  agentMobileNumber: string;
  setAgentMobileNumber: React.Dispatch<React.SetStateAction<string>>;
  invalidAgentMobileNumber: boolean;
  setInvalidAgentMobileNumber: React.Dispatch<React.SetStateAction<boolean>>;
  numberStartsWithFive: boolean;
  setNumberStartsWithFive: React.Dispatch<React.SetStateAction<boolean>>;
}
