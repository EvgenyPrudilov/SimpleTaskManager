import { Enum_TimePeriod } from "./types/Types.js";

export const periodMap: { [key: string]: Enum_TimePeriod } = {
  week: Enum_TimePeriod.WEEK,
  month: Enum_TimePeriod.MONTH,
  ever: Enum_TimePeriod.EVER,
};