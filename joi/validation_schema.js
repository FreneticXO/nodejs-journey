const Joi = require('joi')

const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required()
})

const schema = Joi.object({
    username: Joi.string()
    .alphanum()
    .min(4)
    .max(20)
    .required(),

    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),

    access_token: [
        Joi.string(),
        Joi.number()
    ],

    birth_year: Joi.number()
    .integer()
    .min(1900)
    .max(2013),

    email: Joi.string()
    .email()
    .lowercase()
})
.with('username', 'birth_year')
.xor('password', 'access_token')
.with('password', 'repeat_password')

const value = schema.validate({ username: 'abcd', 
birth_year: '1994', password: "abcd123", 
repeat_password: "abcd123" })

console.log(value)

// try {
//     const value = authSchema.validate({email: 'a@email.com', password: "abc123"});
//     console.log(value)
// } catch (err) {
//     console.error(err)
// }


module.exports = {
    authSchema
}