import request from 'supertest';
import { Types } from 'mongoose';
import server from './../../app';
import { jwtSign } from './../../controller/auth';
import { Genre } from './../../model/genre';

describe('/api/genre', () => {
  let token: string;
  const id = new Types.ObjectId().toHexString();

  beforeEach(() => {
    token = jwtSign(id, false);
  });
  describe('GET /', () => {
    describe('Should be locked down because of authorization', () => {
      test('GET /', async () => {
        const res = await request(server).get('/api/genre');
        expect(res.status).toBe(401);
      });
      test('GET /:id', async () => {
        const res = await request(server).get(`/api/genre/${id}`);
        expect(res.status).toBe(401);
      });
      test('POST /', async () => {
        const res = await request(server).post('/api/genre');
        expect(res.status).toBe(401);
      });
    });
  });
  describe('Should pass authorization with jwt token', () => {
    test('GET /', async () => {
      const jwt = `Bearer ${token}`;
      const res = await request(server)
        .get('/api/genre')
        .set('Authorization', jwt);
      expect(res.status).toBe(200);
    });
    test('GET /:id with incorrect id', async () => {
      const jwt = `Bearer ${token}`;
      const genreId = new Types.ObjectId().toHexString();
      const res = await request(server)
        .get(`/api/genre/${genreId}`)
        .set('Authorization', jwt);
      expect(res.status).toBe(404);
    });
    test('POST / without request body', async () => {
      const jwt = `Bearer ${token}`;
      const res = await request(server)
        .post('/api/genre')
        .set('Authorization', jwt);
      expect(res.status).toBe(400);
    });
    test('POST / with incorrect request body', async () => {
      const jwt = `Bearer ${token}`;
      const res = await request(server)
        .post('/api/genre')
        .set('Authorization', jwt)
        .send({ title: 'comedy' });
      expect(res.status).toBe(400);
    });
    test('POST / with request body', async () => {
      const jwt = `Bearer ${token}`;
      const res = await request(server)
        .post('/api/genre')
        .set('Authorization', jwt)
        .send({ name: 'comedy' });
      expect(res.status).toBe(200);
    });
    test('GET /:id with correct id', async () => {
      const jwt = `Bearer ${token}`;
      const genre = await Genre.findOne({ name: 'comedy' });
      const genreId = genre._id;
      const res = await request(server)
        .get(`/api/genre/${genreId}`)
        .set('Authorization', jwt);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ name: 'comedy' });
    });
  });
  afterAll(async () => {
    await Genre.remove({});
  });
});
