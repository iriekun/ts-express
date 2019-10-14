import { Request, Response } from 'express';
import { validateInput } from './../util/validation';
import { User, joiSchema } from './../model/user';
import bcrypt from 'bcrypt';

type UserType = {
  name: string;
  email: string;
};
export const signup = () => async (req: Request, res: Response) => {
  const { error } = validateInput(req.body, joiSchema);
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
    res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
};
