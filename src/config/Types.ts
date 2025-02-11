
export interface Config {
  dbHost: string,
  dbPort: number,
  dbUser: string,
  dbPassword: string,
  dbName: string,

  serverHost: string,
  serverPort: number,

  jwtSecret: string,
  jwtRefreshSecret: string,

  jwtSecretExpiresIn: string,
  jwtRefreshSecretExpiresIn: string
}