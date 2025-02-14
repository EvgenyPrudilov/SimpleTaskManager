
/*****************************************************************************/
/*****************************************************************************/

export type T_RegisterUser = {
  name: string,
  email: string
}

export function isRegisterUser(obj: any): obj is T_RegisterUser {
  return (
    typeof obj === "object" &&
    typeof obj.name === "string" &&
    typeof obj.email === "string"
  )
}

/*****************************************************************************/
/*****************************************************************************/
