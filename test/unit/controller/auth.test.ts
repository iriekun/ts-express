import { jwtSign } from './../../../src/controller/auth';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const _id = new Types.ObjectId().toHexString();
const payload = {
  _id: _id,
  isAdmin: true
};
describe('jwtSign', () => {
  test('Should return a valid jwt', () => {
    const token = jwtSign(_id, true);
    const decoded = jwt.verify(token, 'jwtPrivateKey');
    expect(decoded).toMatchObject(payload);
  });
});
