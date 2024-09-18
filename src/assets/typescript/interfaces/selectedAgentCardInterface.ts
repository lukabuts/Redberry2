export default interface SelectedAgentInterface {
  selectedAgent: number;
  setSelectedAgent: React.Dispatch<React.SetStateAction<number>>;
  invalidAgent: boolean;
  setInvalidAgent: React.Dispatch<React.SetStateAction<boolean>>;
}
