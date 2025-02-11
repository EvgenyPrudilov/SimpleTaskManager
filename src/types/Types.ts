
export type T_ProjectInitParams = {
  name: string;
  description: string;
  creatorId: number
}

export interface Project {
  id: number;
  name: string;
  description: string;
  user: string,
}