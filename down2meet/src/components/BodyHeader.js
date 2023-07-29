import React from 'react';
import ButtonAvailable from './ButtonAvailable';
import SearchBar from './SearchBar';

export default function BodyHeader({title}) {

    const toggleMobileMenu = () => {
        const menunav = document.querySelector(".Body-Left");
        menunav.classList.toggle("active");
    }

    
    return (
        <div className="Body-Header">
            <div className="Body-Header-Container">
                <div className="Body-Header-Left">
                    <button className='Menu-Popup' onClick={toggleMobileMenu}><i className="fa-solid fa-bars"></i></button>
                    <h1 className='middle-text'>{title}</h1>
                </div>
                <div className="Body-Header-Mobile">
                    <ButtonAvailable />
                    <SearchBar />
                </div>
            </div>
            <div className='middle-line'></div>
        </div>
    )
}