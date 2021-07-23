import React, { useState, useEffect } from 'react';
import axios from 'axios';
import schema from '../validation/formSchema';
import { reach } from 'yup';

const initialFormValue = {
    name: '',
    size: '',
    pepperoni: false,
    cheese: false,
    mushroom: false,
    sausage: false,
    gp: false,
    onion: false,
    pineapple: false,
    bo: false,
    instructions: ''
}

const initialFormErrors = {
    name: '',
    size: '',
    pepperoni: false,
    cheese: false,
    mushroom: false,
    sausage: false,
    gp: false,
    onion: false,
    pineapple: false,
    bo: false,
    instructions: ''
}

const initialDisabled = true;

const Form = (props) => {

    const [ formValue, setFormValue ] = useState(initialFormValue);
    const [ pizzas, setPizzas ] = useState([]);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [ disabled, setDisabled] = useState(initialDisabled);

    const change = e => {
        const { name, value, type, checked } = e.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        setFormValue({ ...formValue, [name]: value });
        setFormValue({ ...formValue, [name]: valueToUse });

        const validate = (name, value) => {
            reach(schema, name)
                .validate(value)
                .then(() => {
                    setFormErrors({ ...formErrors, [name]: '' });
                })
                .catch(err => {
                    setFormErrors({ ...formErrors, [name]: err.errors[0] });
                })
        }
        validate(name, value);
    }

    useEffect(() => {
        schema.isValid(formValue)
            .then(valid => {
                setDisabled(!valid);
            })
    }, [formValue]);

    const submit = e => {
        e.preventDefault();
        const newPizza = {
            name: formValue.name.trim(),
            size: formValue.size,
            toppings: ['pepperoni', 'cheese', 'mushroom', 'sausage', 'gp', 'onion', 'pineapple', 'bo', ].filter(e => formValue[e]),
            // pepperoni: formValue.pepperoni,
            // cheese: formValue.cheese,
            // mushroom: formValue.mushroom,
            // sausage: formValue.sausage,
            // gp: formValue.gp,
            // onion: formValue.onion,
            // pineapple: formValue.pineapple,
            // bo: formValue.bo,
            instructions: formValue.instructions
        }
        axios.post('https://reqres.in/api/orders', newPizza)
            .then(res => {
                setPizzas([res.data, ...pizzas]);
            })
            .catch(err => {
                alert(err);
            })
            .finally(() => {
                setFormValue(initialFormValue);
            })
    }

    return (
        <div>
            <div>
                {formValue.name.length === 0 ? null : formErrors.name}
            </div>
            <form id = 'pizza-form' onSubmit = {submit}>
                <div>
                    <label>Name: &nbsp;
                        <input
                            type = 'text'
                            id = 'name-input'
                            name = 'name'
                            value = {formValue.name}
                            onChange = {change}
                        />
                    </label>
                </div>
                <div>
                    <label>Pizza Size: &nbsp;
                        <select id = 'size-dropdown' value = {formValue.size} name = 'size' onChange = {change}>
                            <option value = ''> --Pick One--</option>
                            <option value = 'small'>Small</option>
                            <option value = 'medium'>Medium</option>
                            <option value = 'large'>Large</option>
                            <option value = 'xl'>Extra Large</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>Toppings: </label>
                    <div>
                        <label>Pepperoni: &nbsp;
                            <input
                                type = 'checkbox'
                                name = 'pepperoni'
                                onChange = {change}
                                checked = {formValue.pepperoni}
                            />
                        </label>
                        <label>Cheese: &nbsp;
                            <input
                                type = 'checkbox'
                                name = 'cheese'
                                onChange = {change}
                                checked = {formValue.cheese}
                            />
                        </label>
                        <label>Mushroom: &nbsp;
                            <input
                                type = 'checkbox'
                                name = 'mushroom'
                                onChange = {change}
                                checked = {formValue.mushroom}
                            />
                        </label>
                        <label>Sausage: &nbsp;
                            <input
                                type = 'checkbox'
                                name = 'sausage'
                                onChange = {change}
                                checked = {formValue.sausage}
                            />
                        </label>
                        <label>Green Pepper: &nbsp;
                            <input
                                type = 'checkbox'
                                name = 'gp'
                                onChange = {change}
                                checked = {formValue.gp}
                            />
                        </label>
                        <label>Onion: &nbsp;
                            <input
                                type = 'checkbox'
                                name = 'onion'
                                onChange = {change}
                                checked = {formValue.onion}
                            />
                        </label>
                        <label>Pineapple: &nbsp;
                            <input
                                type = 'checkbox'
                                name = 'pineapple'
                                onChange = {change}
                                checked = {formValue.pineapple}
                            />
                        </label>
                        <label>Black Olives: &nbsp;
                            <input
                                type = 'checkbox'
                                name = 'bo'
                                onChange = {change}
                                checked = {formValue.bo}
                            />
                        </label>
                    </div>
                </div>
                <div>
                    <label>Special Instructions: &nbsp;
                        <div>
                            <textarea
                                id = 'special-text'
                                name = 'instructions'
                                rows = '4'
                                columns = '40'
                                onChange = {change}
                                value = {formValue.instructions}
                            />
                        </div>
                    </label>
                </div>
                <button disabled = {disabled} id = 'order-button' name = 'orderBtn'>Add to Order</button>
            </form>
        </div>
    )
}

export default Form;