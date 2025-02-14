
/*****************************************************************************/
/*****************************************************************************/

import { TaskStatus } from "@prisma/client";
import { Enum_TimePeriod } from "./Types.js";

export type T_ProjectCreateParams = {
  name: string,
  description: string,
  creatorId: number
}

export function isProjectCreateParams(obj: any): obj is T_ProjectCreateParams {
  return (
    typeof obj === "object" &&
    typeof obj.name === "string" &&
    typeof obj.description === "string" &&
    typeof obj.creatorId === "number"
  );
}

/*****************************************************************************/
/*****************************************************************************/

export type T_TaskCreateParams = {
  name: string,
  description: string,
  projectId: number,
  dueDate: Date
}

export function isTaskCreateParams(obj: any): obj is T_TaskCreateParams {
  return (
    typeof obj === "object" &&
    typeof obj.name === "string" &&
    typeof obj.description === "string" &&
    typeof obj.projectId === "number" &&
    obj.dueDate instanceof Date
  );
}

/*****************************************************************************/
/*****************************************************************************/

export type T_SetTaskUserParams = {
  projectId: number,
  taskId: number,
  userId: number  
}

export function isSetTaskUserParams(obj: any): obj is T_SetTaskUserParams {
  return (
    typeof obj === "object" &&
    typeof obj.projectId === "number" &&
    typeof obj.taskId === "number" &&
    typeof obj.userId === "number"
  );
}

/*****************************************************************************/
/*****************************************************************************/

export type T_SetTaskStatusParams = {
  projectId: number,
  taskId: number,
  userId: number,
  taskStatus: TaskStatus  
}

export function isSetTaskStatusParams(obj: any): obj is T_SetTaskStatusParams {
  return (
    typeof obj === "object" &&
    typeof obj.projectId === "number" &&
    typeof obj.taskId === "number" &&
    typeof obj.userId === "number" &&
    Object.values(TaskStatus).includes(obj.taskStatus) // Предполагается, что TaskStatus - это enum
  );
}

/*****************************************************************************/
/*****************************************************************************/

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

/*****************************************************************************/
/*****************************************************************************/
