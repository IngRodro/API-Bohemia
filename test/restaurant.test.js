import restaurantModel from '../src/Application/v1/restaurant/restaurant.model';
import {
  initialRestaurants,
  api,
  getAllNamesfromRestaurant,
} from './helper/restaurant.helper';
import userModel from '../src/Application/v1/user/user.model';
import {initialUsers} from './helper/user.helper';

beforeEach(async () => {
  await restaurantModel.deleteMany({});
  await restaurantModel.create(initialRestaurants);
  await userModel.deleteMany({username: ['Rodrigo15', 'Laura23', 'YoshiG2']});
  await userModel.create(initialUsers);
});

describe('Obtener restaurantes', () => {
  test('Obtener restaurantes iniciales', async () => {
    const response = await api.get('/v1/restaurants/');
    expect(response.body.restaurants).toHaveLength(initialRestaurants.length);
  });
});

describe('Creacion de un restaurante', () => {
  test('Es posible guardar con un restaurante valido', async () => {
    const newRestaurant = {
      name: 'Restaurant 3',
      email: 'restaurant3@gmail.com',
      status: 'active',
      department: 'Chalatenango',
      municipality: 'Chalatenango',
      direction: 'Direction 3',
      phone: '567891234',
      openingHour: '09:00',
      closingHour: '21:00',
      dir: 'test/img/logo.jpg',
      user: '634c687603eaf9e8e0d1828a'
    };

    await api
      .post('/v1/restaurants')
      .field('name', newRestaurant.name)
      .field('email', newRestaurant.email)
      .field('status', newRestaurant.status)
      .field('department', newRestaurant.department)
      .field('municipality', newRestaurant.municipality)
      .field('direction', newRestaurant.direction)
      .field('phone', newRestaurant.phone)
      .field('openingHour', newRestaurant.openingHour)
      .field('closingHour', newRestaurant.closingHour)
      .field('user', newRestaurant.user)
      .attach('image', newRestaurant.dir)
      .set('Content-Type', 'multipart/form-data')
      .set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiI2MzRjZTI3Zjk3MzFiN2JhNzg2OTlkZDgiLCJpYXQiOjE2NjYxMzU1NjgsImV4cCI6MTY2NjIyMTk2OH0.IwH6EDoxptuaF3lpwni4iEtCkud7BFtwhHqaj57h7io')
      .expect(201);

    const { names, response } = await getAllNamesfromRestaurant();

    expect(response.body.restaurants).toHaveLength(initialRestaurants.length + 1);
    expect(names).toContain(newRestaurant.name);
  });

  test("No es posible guardar con las propiedades vacias de un restaurante", async () => {
    const newRestaurant = {
      name: '',
      email: '',
      status: '',
      department: '',
      municipality: '',
      direction: '',
      phone: '',
      openingHour: '',
      closingHour: '',
      dir: '',
    };

    await api
      .post('/v1/restaurants')
      .field('name', newRestaurant.name)
      .field('email', newRestaurant.email)
      .field('status', newRestaurant.status)
      .field('department', newRestaurant.department)
      .field('municipality', newRestaurant.municipality)
      .field('direction', newRestaurant.direction)
      .field('phone', newRestaurant.phone)
      .field('openingHour', newRestaurant.openingHour)
      .field('closingHour', newRestaurant.closingHour)
      .set('Content-Type', 'multipart/form-data')
      .set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiI2MzRjZTI3Zjk3MzFiN2JhNzg2OTlkZDgiLCJpYXQiOjE2NjYxMzU1NjgsImV4cCI6MTY2NjIyMTk2OH0.IwH6EDoxptuaF3lpwni4iEtCkud7BFtwhHqaj57h7io')
      .expect(400);

    const response = await api.get('/v1/restaurants');

    expect(response.body.restaurants).toHaveLength(initialRestaurants.length);
  });

  test('No es posible guardar con un restaurante invalido', async () => {
    const newRestaurant = {
      name: 123,
      email: 208,
      status: true,
      department: false,
      municipality: 0.5,
      direction: 11.0,
      phone: 100,
      openingHour: 22.5,
      closingHour: 32,
    };

    await api
      .post('/v1/restaurants')
      .field('name', newRestaurant.name)
      .field('email', newRestaurant.email)
      .field('status', newRestaurant.status)
      .field('department', newRestaurant.department)
      .field('municipality', newRestaurant.municipality)
      .field('direction', newRestaurant.direction)
      .field('phone', newRestaurant.phone)
      .field('openingHour', newRestaurant.openingHour)
      .field('closingHour', newRestaurant.closingHour)
      .expect(400)
      .set('Content-Type', 'multipart/form-data')
      .set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiI2MzRjZTI3Zjk3MzFiN2JhNzg2OTlkZDgiLCJpYXQiOjE2NjYxMzU1NjgsImV4cCI6MTY2NjIyMTk2OH0.IwH6EDoxptuaF3lpwni4iEtCkud7BFtwhHqaj57h7io')

    const response = await api.get('/v1/restaurants');

    expect(response.body.restaurants).toHaveLength(initialRestaurants.length);
  });
});

describe('Actualizar restaurante', () => {
  test('Es posible actualizar con un restaurante valido', async () => {
    const restaurants = await restaurantModel.find();
    const updateRestaurant = {
      name: 'Restaurant Updated',
      email: 'restauranteUpdated@gmail.com',
      department: 'Chalatenango',
      municipality: 'Santa Rita',
      direction: 'Direction Updated',
      phone: '345678912',
      openingHour: '10:00',
      closingHour: '22:00',
      dir: 'test/img/logo.jpg',
    };

    await api
      .put(`/v1/restaurants/${restaurants[0]._id}`)
      .field('name', updateRestaurant.name)
      .field('email', updateRestaurant.email)
      .field('department', updateRestaurant.department)
      .field('municipality', updateRestaurant.municipality)
      .field('direction', updateRestaurant.direction)
      .field('phone', updateRestaurant.phone)
      .field('openingHour', updateRestaurant.openingHour)
      .field('closingHour', updateRestaurant.closingHour)
      .attach('logo', updateRestaurant.dir)
      .set('Content-Type', 'multipart/form-data')
      .set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiI2MzRjZTI3Zjk3MzFiN2JhNzg2OTlkZDgiLCJpYXQiOjE2NjYxMzU1NjgsImV4cCI6MTY2NjIyMTk2OH0.IwH6EDoxptuaF3lpwni4iEtCkud7BFtwhHqaj57h7io')
      .expect(200);

    const restaurantUpdated = await restaurantModel.findById(restaurants[0]._id);
    expect(restaurantUpdated).toHaveProperty('name', updateRestaurant.name);
    expect(restaurantUpdated).toHaveProperty('email', updateRestaurant.email);
    expect(restaurantUpdated).toHaveProperty('department', updateRestaurant.department);
    expect(restaurantUpdated).toHaveProperty('municipality', updateRestaurant.municipality);
    expect(restaurantUpdated).toHaveProperty('direction', updateRestaurant.direction);
    expect(restaurantUpdated).toHaveProperty('phone', updateRestaurant.phone);
    expect(restaurantUpdated).toHaveProperty('openingHour', updateRestaurant.openingHour);
    expect(restaurantUpdated).toHaveProperty('closingHour', updateRestaurant.closingHour);
  });

  test("No es posible actualizar con las propiedades vacias de un restaurante", async () => {
    const restaurants = await restaurantModel.find();
    const updateRestaurant = {
      name: '',
      email: '',
      department: '',
      municipality: '',
      direction: '',
      phone: '',
      openingHour: '',
      closingHour: '',
    };

    await api
      .put(`/v1/restaurants/${restaurants[0]._id}`)
      .field('name', updateRestaurant.name)
      .field('email', updateRestaurant.email)
      .field('department', updateRestaurant.department)
      .field('municipality', updateRestaurant.municipality)
      .field('direction', updateRestaurant.direction)
      .field('phone', updateRestaurant.phone)
      .field('openingHour', updateRestaurant.openingHour)
      .field('closingHour', updateRestaurant.closingHour)
      .set('Content-Type', 'multipart/form-data')
      .set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiI2MzRjZTI3Zjk3MzFiN2JhNzg2OTlkZDgiLCJpYXQiOjE2NjYxMzU1NjgsImV4cCI6MTY2NjIyMTk2OH0.IwH6EDoxptuaF3lpwni4iEtCkud7BFtwhHqaj57h7io')
      .expect(400);

    const restaurantUpdated = await restaurantModel.findById(restaurants[0]._id);
    expect(restaurantUpdated).toHaveProperty('name', restaurants[0].name);
    expect(restaurantUpdated).toHaveProperty('email', restaurants[0].email);
    expect(restaurantUpdated).toHaveProperty('department', restaurants[0].department);
    expect(restaurantUpdated).toHaveProperty('municipality', restaurants[0].municipality);
    expect(restaurantUpdated).toHaveProperty('direction', restaurants[0].direction);
    expect(restaurantUpdated).toHaveProperty('phone', restaurants[0].phone);
    expect(restaurantUpdated).toHaveProperty('openingHour', restaurants[0].openingHour);
    expect(restaurantUpdated).toHaveProperty('closingHour', restaurants[0].closingHour);
  });
});


describe('Logueo', () => {
  test('Es posible loguearse con un usuario correcto', async () => {
    const res = await api.post('/v1/users/login').send({ username : "IngRodrigo",
      password : "123"})
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    expect(res.status).toBe(200)
  });

  test('No es posible loguearse con un usuario incorrecto', async () => {
    const res = await api.post('/v1/users/login').send({ username : "IngRodrigo",
      password : "1234"})
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    expect(res.status).toBe(401)
  });
})

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
