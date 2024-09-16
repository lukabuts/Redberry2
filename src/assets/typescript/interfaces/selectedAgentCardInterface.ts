export default interface SelectedAgentInterface {
  selectedAgent: number | undefined;
  setSelectedAgent: React.Dispatch<React.SetStateAction<number | undefined>>;
}
