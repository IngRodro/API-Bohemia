import express from 'express';
import cors from 'cors';
import { initializeDB } from './db';

const corsOptions = {
  allowedHeaders: 'Content-Type, auth-token',
};

export const app = express();

// creating Server
export const initializeServer = async (routes) => {
  // initialize DB
  await initializeDB();

  app.use(cors(corsOptions));

  // json parse
  app.use(express.json());

  // set urls
  app.use(routes);
};
