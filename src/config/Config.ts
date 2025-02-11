import { config as readConfigFile } from "dotenv";
import { Config } from "./Types.js";

const dbDefaultHost = 'localhost';
const dbDefaultPort = '4200';
const dbDefaultUser = 'admin';
const dbDefaultPassword = '1234';
const dbDefaultName = 'db';

const serverDefaultHost = 'localhost';
const serverDefaultPort = '4200';

const jwtDefaultSecret = "N1EKTKDhtSfZIUiP8Mcbp9BxScTEKrAR6wVH5gT3LKw=";
const jwtDefaultRefreshSecret = "blyKZKWQ+b1FZfduKZEhkweOZ/PuqQus6kqPsHgrF2s=";

const jwtDefaultSecretExpiresIn = "1d";
const jwtDefaultRefreshSecretExpiresIn = "30d";

readConfigFile();

export const config: Config = {
    dbHost: process.env.DB_HOST || dbDefaultHost,
    dbPort: parseInt(process.env.DB_PORT || dbDefaultPort, 10),
    dbUser: process.env.DB_USER || dbDefaultUser,
    dbPassword: process.env.DB_PASSWORD || dbDefaultPassword,
    dbName: process.env.DB_NAME || dbDefaultName,

    serverHost: process.env.SERVER_HOST || serverDefaultHost,
    serverPort: parseInt(process.env.SERVER_PORT || serverDefaultPort, 10),

    jwtSecret: process.env.JWT_SECRET || jwtDefaultSecret,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || jwtDefaultRefreshSecret,

    jwtSecretExpiresIn: process.env.JWT_SECTER_EXPIRES_IN || jwtDefaultSecretExpiresIn,
    jwtRefreshSecretExpiresIn: process.env.JWT_REFRESH_SECRET_EXPIRES_IN || jwtDefaultRefreshSecretExpiresIn
};