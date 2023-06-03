import React, { useState } from 'react';

export default function Button(){

    const [isBusy, setIsBusy] = useState(false);

    const buttonAvailable = isBusy ? 'button busy' : 'button available';
    
    const handleClick = () =>{
        setIsBusy(!isBusy);
    }
    return(
        <div>
            <button className={buttonAvailable} onClick= {handleClick}>{isBusy ? 'Busy' : 'Available'} </button>
        </div>
    );
}