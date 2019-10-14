import { Request, Response } from 'express';
import { validateInput } from './../util/validation';

export const getAll = (model: any) => async (req: Request, res: Response) => {
  try {
    const doc = await model.find();
    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

// prettier-ignore
export const create = (model: any, schema: any) => async (req: Request, res: Response) => {
  const { error } = validateInput(req.body, schema);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let doc = new model({...req.body});
    doc = await doc.save();
  
    res.status(200).json({ data: doc });
  } catch (e) {
      console.error(e);
      res.status(400).end();
  }
};

// prettier-ignore
export const update = (model: any, schema: any) => async (req: Request, res: Response) => {
  const { error } = validateInput(req.body, schema);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const doc = await model.findByIdAndUpdate(req.params.id, ...req.body, {
      new: true
    });

    if (!doc)
      return res.status(404).send('Genre with the given ID is not found!');

    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

// prettier-ignore
export const remove = (model: any) => async (req: Request, res: Response) => {  
  try {
    const doc = await model.findByIdAndRemove(req.params.id);
    if (!doc)
      return res.status(404).send('The genre with the given ID was not found.');

    res.status(200).json({ data: doc});
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

// prettier-ignore
export const getById = (model: any) => async (req: Request, res: Response) => {
  try {
    const doc = await model.findById(req.params.id);
    if (!doc)
      return res.status(404).send('The genre with the given ID was not found.');

    res.send(doc);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
