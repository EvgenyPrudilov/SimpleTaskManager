
/*****************************************************************************/
/*****************************************************************************/

export type T_UserRefreshToken = {
  refreshToken: string
}

export function isUserRefreshToken(obj: any): obj is T_UserRefreshToken {
  return (
    typeof obj === "object" &&
    typeof obj.refreshToken === "string"
  );
}

/*****************************************************************************/
/*****************************************************************************/

export type T_AccessTokenPayload = {
  id: number
}
export type T_RefreshTokenPayload = T_AccessTokenPayload;

export function isAccessTokenObject(obj: any): obj is T_AccessTokenPayload {
  return (
    typeof obj === "object" &&
    typeof obj.id === "number"
  );
}
export function isRefreshTokenObject(obj: any): obj is T_AccessTokenPayload {
  return isAccessTokenObject(obj);
}

/*****************************************************************************/
/*****************************************************************************/

/*****************************************************************************/
/*****************************************************************************/

export type T_RefreshTokensParams = {
  userId: number,
  accessToken: T_AccessTokenPayload,
  refreshToken: T_RefreshTokenPayload
}

export function isRefreshTokensParams(obj: any): obj is T_RefreshTokensParams {
  return (
    typeof obj === "object" &&
    typeof obj.userId === "number" &&
    isAccessTokenObject(obj.accessToken) && 
    isRefreshTokenObject(obj.refreshToken)
  );
}