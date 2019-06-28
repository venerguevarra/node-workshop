import dotenv from 'dotenv/config';

let configuration = {
  environment: process.env.ENVIRONMENT,
  hostPort: process.env.PORT
};

export default configuration;