import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .test('len', 'name must be at least 2 characters', val => val.length >= 2)
        .required(),
    size: yup.string(),
    pepperoni: yup.boolean(),
    cheese: yup.boolean(),
    mushroom: yup.boolean(),
    sausage: yup.boolean(),
    gp: yup.boolean(),
    onion: yup.boolean(),
    pineapple: yup.boolean(),
    bo: yup.boolean(),
    instructions: yup.string()
})

export default formSchema;