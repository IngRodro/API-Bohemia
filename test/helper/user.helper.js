import supertest from 'supertest';
import { App } from '../../src/main';

import UsersModel from '../../src/Application/v1/user/user.model';

export const api = supertest(App);

export const initialUsers = [
  {
    username : "Rodrigo15",
    name : "Rodrigo Ramirez",
    password : "123"
  },
  {
    username : "Laura23",
    name : "Laura Castro",
    password : "123"
  }
];

export const getUsers = async () => {
  const user = await UsersModel.find({});
  return user.map((restaurant) => restaurant.toJSON());
};
