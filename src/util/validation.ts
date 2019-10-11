import Joi from 'Joi';

// prettier-ignore
export const validateInput = (model: any, joiSchema: any): Joi.ValidationResult<any> => {
    return Joi.validate(model, joiSchema);
};
