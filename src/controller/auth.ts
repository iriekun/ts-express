import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from './../config';
import { validateInput } from '../util/validation';
import { User, signUpSchema, loginSchema } from '../model/user';

type UserType = {
  name: string;
  email: string;
};

export const getCurrentUser = () => async (req: Request, res: Response) => {
  console.log(req.user);
  const user = await User.findById(req.user._id).select('-password');
  res.status(200).json({ data: user });
};
export const signup = () => async (req: Request, res: Response) => {
  const { error } = validateInput(req.body, signUpSchema);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let userModel = await User.findOne({ email: req.body.email });
    if (userModel) return res.status(400).send('User already registered');

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    userModel = await User.create({ ...req.body, password });

    const user: UserType = {
      name: userModel.name,
      email: userModel.email
    };
    const token = jwtSign(userModel._id, userModel.isAdmin);
    res
      .header('x-auth-token', token)
      .status(200)
      .json({ data: user });
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
};

export const login = () => async (req: Request, res: Response) => {
  const { error } = validateInput(req.body, loginSchema);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const userModel = await User.findOne({ email: req.body.email });
    if (!userModel) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(
      req.body.password,
      userModel.password
    );
    if (!validPassword)
      return res.status(400).send('Invalid email or password');

    const user: UserType = {
      name: userModel.name,
      email: userModel.email
    };
    const token = jwtSign(userModel._id, userModel.isAdmin);
    res
      .header('x-auth-token', token)
      .status(200)
      .json({ data: user });
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
};

export const jwtSign = (id: string, isAdmin: boolean) => {
  return jwt.sign({ _id: id, isAdmin: isAdmin }, config.secrets.jwt);
};
