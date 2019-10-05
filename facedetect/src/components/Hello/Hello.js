import React from 'react';
import './Hello.css';

const Hello = (props) => {
    // let name = "Megha"
    const {name} = props;
    return (
        <div className = "greeting">
            Welcome, <span>{name}</span>! How are you?
        </div>
    )
}
export default Hello;