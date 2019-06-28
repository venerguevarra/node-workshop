import dotenv from 'dotenv/config';

let configuration = {
  environment: process.env.ENV,
  port: process.env.PORT,
  version: process.env.VERSION,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbConnectionLimit: process.env.DB_CONNECTION_LIMIT
};

export default configuration;