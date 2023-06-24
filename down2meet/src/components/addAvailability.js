import React from "react";
import { useRef } from 'react';

export default function AddAvailability() {

    const itemIDRef = useRef(null);
    const itemNameRef = useRef(null);
    const itemDescRef = useRef(null);
    const itemPriceRef = useRef(null);
    const itemImgRef = useRef(null);

    const handleFormSubmit = () => {
        // call post request. to put this there 
    }

    const handleUpdateButton = () => {
        // call put request to edit particular 
    }
    return (
        <div className="add-availability-form-div">
            <h1>Add your Availability</h1>
            <form className="availability-form" onSubmit={handleFormSubmit}>
            <label htmlFor="iName">Event ID (for updates):</label><br />
              <input type="text" id="iID" name="iID" ref={itemIDRef} /><br /><br />
              <hr/> <br/>
              {/* <label htmlFor="iName">Event name:</label><br />
              <input type="text" id="iName" name="iName" ref={itemNameRef} /><br /><br /> */}
              <label htmlFor="iDes">Description (optional?):</label><br />
              <input type="text" id="iDes" name="iDes" ref={itemDescRef} /><br /><br />
              <label htmlFor="iPrice">From:</label><br />
              <input type="date" id="iPrice" name="iPrice" ref={itemPriceRef} /><br /><br />
              <label htmlFor="iImg">To:</label><br />
              <input type="date" id="iImg" name="iImg" ref={itemImgRef} /><br /><br />
              {/* add selector for which friends can see it. */}
                 
                <div className="d-flex justify-content-center">
                    <input type="submit" id="submitButton" value="Add"/>
                </div>    <br/>
                <div className="d-flex justify-content-center">
                    <input type="button" id="updateButton" value="Update" onClick={handleUpdateButton}/>
                </div>   <br/>

                <div className="d-flex justify-content-center">
                    <input type="button" id="updateButton" value="Delete" onClick={handleUpdateButton}/>
                </div>   <br/>
                <div className="d-flex justify-content-center">
                    <input type="reset" id="resetButton" value="Reset"/>
                </div>               
            </form>    
            </div>
            );

}