import { realEstateType } from "./realEstateType";

export type detailedRealEstateType = realEstateType & {
  agent: {
    id: number;
    avatar: string;
    email: string;
    name: string;
    phone: string;
    surname: string;
  };
  agent_id: number;
  created_at: string;
  description: string;
};
