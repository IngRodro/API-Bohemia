import userModel from '../src/Application/v1/user/user.model';
import {
  initialUsers,
  api,
  getUsers,
} from './helper/user.helper';

beforeEach(async () => {
  await userModel.deleteMany({username: ['Rodrigo15', 'Laura23']});
  await userModel.create(initialUsers);
});

describe('Obtener restaurantes', () => {
  test('Obtener todos los restaurantes', () => api
    .get('/v1/restaurants/')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  );

  test('Obtener restaurantes iniciales', async () => {
    const response = await api.get('/v1/restaurants/');
    expect(response.body.restaurants).toHaveLength(initialRestaurants.length);
  });
});

describe('Creacion de un usuario', () => {
  test('Es posible crear con un usuario valido', async () => {
    const newUser = {
      name: 'Joshua Galdamez',
      username: 'YoshiG2',
      password: '123'
    };

    await api
      .post('/v1/users')
      .send({
        ...newUser
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201);
  });

  test("No es posible guardar con las propiedades vacias de un usuario", async () => {
    const newUser = {
      name: '',
      username: '',
      password: ''
    };

    await api
      .post('/v1/users')
      .send({
        ...newUser
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400);
  });

  test('No es posible guardar con un usuario invalido', async () => {
    const newUser = {
      name: 123,
      username: null,
      password: '123'
    };

    await api
      .post('/v1/users')
      .send({
        ...newUser
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400);
  });
});

