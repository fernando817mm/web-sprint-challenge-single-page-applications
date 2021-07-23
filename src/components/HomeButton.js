import React from 'react';
import { Link } from 'react-router-dom';

const HomeButton = (props) => {
    return (
        <div>
            <Link to = '/'>
                <h1>Lambda Eats</h1>
            </Link>
        </div>
    )
}

export default HomeButton;
