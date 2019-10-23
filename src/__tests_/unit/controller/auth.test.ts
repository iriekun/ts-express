import { jwtSign } from '../../../controller/auth';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import config from '../../../config';

const id = new Types.ObjectId().toHexString();
const payload = {
  _id: id,
  isAdmin: true
};
describe('jwtSign', () => {
  test('Should return a valid jwt', () => {
    const token = jwtSign(id, true);
    const decoded = jwt.verify(token, config.secrets.jwt);
    expect(decoded).toMatchObject(payload);
  });
});
