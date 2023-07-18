const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const schema = Joi.object().keys({
    name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

    birthyear: Joi.number()
    .integer()
    .min(1970)
    .max(2013)

})

const blogPostSchema = Joi.object().keys({
    title: Joi.string().alphanum().min(3).max(30).required(),
    description: Joi.string(),
    comments: Joi.array().items(Joi.object().keys({
        description: Joi.string(),
        author: Joi.string().required(),
        rating: Joi.number().min(1).max(5)
    }))
})

const vogue = {
    title: 'myblog1',
    description: ' some desc...',
    comments: [
        {
            description: 'comment1',
            author: 'author1',
            rating: 4
        },
        {
            description: 'comment2',
            author: 'author2',
            rating: 3
        }
    ]
}


const result = blogPostSchema.validate(vogue)



const dataValidate = {
    name: 'chris',
    birthyear: 1988
}



// const result = schema.validate(dataValidate);

// console.log(result)


app.listen(8080, () => {
    console.log('listening on port 8080')
})