import express from 'express';
import cors from 'cors';
import getConfig from 'config';
import { initializeDB } from './db';

const { port } = getConfig();

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

  app.listen(port, () => {
    console.log(`This APP is listening on http://localhost:${port}`);
  });
};
