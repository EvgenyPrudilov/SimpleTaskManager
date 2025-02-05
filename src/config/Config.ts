import { config as readConfigFile } from "dotenv";
import { Config } from "./Types.js";

const dbDefaultHost = 'localhost';
const dbDefaultPort = '4200';
const dbDefaultUser = 'admin';
const dbDefaultPassword = '1234';
const dbDefaultName = 'db';

const serverDefaultHost = 'localhost';
const serverDefaultPort = '4200';

readConfigFile();

export const config: Config = {
    dbHost: process.env.DB_HOST || dbDefaultHost,
    dbPort: parseInt(process.env.DB_PORT || dbDefaultPort, 10),
    dbUser: process.env.DB_USER || dbDefaultUser,
    dbPassword: process.env.DB_PASSWORD || dbDefaultPassword,
    dbName: process.env.DB_NAME || dbDefaultName,

    serverHost: process.env.SERVER_HOST || serverDefaultHost,
    serverPort: parseInt(process.env.SERVER_PORT || serverDefaultPort, 10),
};