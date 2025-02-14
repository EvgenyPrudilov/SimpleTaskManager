
import { Enum_TimePeriod } from "./Types.js"

/*****************************************************************************/
/*****************************************************************************/

export type T_GetUserProjectsParams = {
  userId: number
}

export function isGetUserProjectsParams(obj: any): obj is T_GetUserProjectsParams {
  return (
    typeof obj === "object" &&
    typeof obj.userId === "number"
  )
}

/*****************************************************************************/
/*****************************************************************************/

export type T_GetUserTimingParams = {
  userId: number, 
  projectId: number | undefined, 
  period: Enum_TimePeriod
}

export function isGetUserTimingParams(obj: any): obj is T_GetUserTimingParams {
  return (
    typeof obj === "object" &&
    typeof obj.userId === "number" &&
    ["number", "undefined"].includes(typeof obj.projectId) &&
    [Enum_TimePeriod.WEEK, Enum_TimePeriod.MONTH, Enum_TimePeriod.EVER].includes(obj.period)
  )
}
