export default interface AgentFullNameInterface {
  agentName: string;
  setagentName: React.Dispatch<React.SetStateAction<string>>;
  invalidAgentName: boolean;
  setInvalidAgentName: React.Dispatch<React.SetStateAction<boolean>>;
  agentSurname: string;
  setAgentSurname: React.Dispatch<React.SetStateAction<string>>;
  invalidAgentSurname: boolean;
  setInvalidAgentSurname: React.Dispatch<React.SetStateAction<boolean>>;
}
