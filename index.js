const Ajv = require('ajv').default;
const AjvFormats = require('ajv-formats');
const ajv = new Ajv();
AjvFormats(ajv);

const obj = {
    username: 'martyn@protonmail.com',
    techs: {
        javascript: true,
        php: true,
        rust: false
    },
    exp: 1,
    date: '2021-12-23',
    email: 'martyn@gmail.com'
}

const schema = {
    type: 'object',
    properties: {
        username: { type: 'string', minLength: 1 },
        techs: { 
            type: 'object',
            properties: {
                javascript: { type: 'boolean' },
                php: { type: 'boolean' },
                rust: { type: 'boolean' },
            },
            required: ['javascript', 'php', 'rust'],
        },
        exp: { type: 'number' },
        date: { type: 'string', format: 'date-time' },
        email: {type: "string", format: 'email-format'}
    },
    required: ['username', 'techs', 'exp', 'date', 'email']
}

const dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
ajv.addFormat('date-time', dateRegex);
ajv.addFormat('email-format', emailRegex)

const check = async (data, structure) => {
        const validate = ajv.compile(structure);
        const resp = validate(data);
        return resp;
}

check(obj, schema).then(console.log)
