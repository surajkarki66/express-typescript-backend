import { ValidationError } from 'express-validator';

const errorFormatter = ({ location, msg, param, value, nestedErrors }: ValidationError) => {
    return `${msg}`;
};

export default errorFormatter;
