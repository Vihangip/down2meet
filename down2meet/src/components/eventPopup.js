import React, { useState } from "react";
import { deleteItemAsync } from "../reducers/items/thunks";
import { useDispatch } from 'react-redux';
 
const eventPopup = ({eventDetials}) => {
// ChatGPT helped me learn to useState to hide and show content!
 

const [showPopUp, setShowPopUp] = useState(false);

const dispatch = useDispatch();


const togglePopUpCard = () => {
  setShowPopUp(!showPopUp);
};

const handleDelete = () => {
  dispatch(deleteItemAsync(itemDetails.id));
};

const removePopUp = () => {
  setShowPopUp(false);
};

const handleClick = () => {
    removePopUp();
};

return (
    <div className="popup">
      <div className="popup-content">
        <div className="card item-card text-center">
          <div className="card-body">
            <img className="thumbnail" src={itemDetails.image} alt="" />
            <h5>{itemDetails.item}</h5>
            <p>{itemDetails.description}</p>
            <h6>$ {itemDetails.price}</h6>
            <button className="delete-btn-class" onClick={handleDelete}></button>
            <button className="minimize-button" onClick={handleClick}>X</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default eventPopup;
