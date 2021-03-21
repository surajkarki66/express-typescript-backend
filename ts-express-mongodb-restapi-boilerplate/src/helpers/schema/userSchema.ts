import Joi from 'joi';

const schemas = {
    userSIGNUP: Joi.object().keys({
        firstName: Joi.string().min(2).max(32).required(),
        lastName: Joi.string().min(2).max(32).required(),
        email: Joi.string()
            .email({
                minDomainSegments: 2,
                tlds: {
                    allow: ['com', 'net']
                }
            })
            .required(),
        password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        role: Joi.string().valid('user', 'admin').required()
    }),
    userLIST: Joi.object().keys({
        page: Joi.number().min(0).required(),
        usersPerPage: Joi.number().min(1).required()
    })
};

export default schemas;
