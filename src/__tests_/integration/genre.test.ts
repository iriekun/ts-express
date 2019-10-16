import request from 'supertest';
import server from './../../app';

describe('/api/genre', () => {
  describe('GET /', () => {
    test('Should be locked down because of authorization', async () => {
      const res = await request(server).get('/api/genre');
      expect(res.status).toBe(401);
    });
  });
});
