import dotenv from 'dotenv/config';

let configuration = {
  environment: process.env.NODE_ENV,
  port: process.env.NODE_PORT,
  version: process.env.VERSION
};

export default configuration;