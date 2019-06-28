import dotenv from 'dotenv/config';

let configuration = {
  environment: process.env.ENVIRONMENT,
  hostPort: process.env.PORT,
  dbUsername: process.env.DB_USERNAME
};

export default configuration;