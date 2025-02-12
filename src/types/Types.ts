import { TaskStatus } from "@prisma/client"

export type T_ProjectCreateParams = {
  name: string,
  description: string,
  creatorId: number
}

export type T_TaskCreateParams = {
  name: string,
  description: string,
  projectId: number,
  dueDate: Date
}

export type T_SetTaskUserParams = {
  projectId: number,
  taskId: number,
  userId: number  
}

export type T_SetTaskStatusParams = {
  projectId: number,
  taskId: number,
  userId: number,
  taskStatus: TaskStatus  
}

export type T_GetProjectTimingParams = {
  projectId: number,
  period: Enum_TimePeriod  
}

export function isGetProjectTimingParams(obj: any): obj is T_GetProjectTimingParams {
  return (
    typeof obj === "object" &&
    typeof obj.projectID === "number" &&
    Object.values(Enum_TimePeriod).includes(obj.period)
  )
}

export enum Enum_TimePeriod {
  WEEK,
  MONTH,
  EVER
}

export interface Project {
  id: number;
  name: string;
  description: string;
  user: string,
}