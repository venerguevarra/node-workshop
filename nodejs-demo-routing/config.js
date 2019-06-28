import dotenv from 'dotenv/config';

let configuration = {
  environment: process.env.NODE_ENV,
  port: process.env.NODE_PORT,
  secret: process.env.NODE_SESSION_SECRET
};

export default configuration;