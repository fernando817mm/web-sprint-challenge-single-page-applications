import React from 'react';
import { Link } from 'react-router-dom';
import FormButton from './FormButton';

const Home = (props) => {
    return (
        <div>
            <Link to = '/pizza' id = 'order-pizza'>
                <FormButton />
            </Link>
        </div>
    )
}

export default Home;