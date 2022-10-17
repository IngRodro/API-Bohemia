import express from 'express';
import { initializeDB } from './db';
import cors from 'cors';

export const app = express();

// creating Server
export const initializeServer = async (routes) => {
  // initialize DB
  await initializeDB();

  app.use(cors());

  // json parse
  app.use(express.json());

  // set urls
  app.use(routes);
};
