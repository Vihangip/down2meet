
import React from 'react';
import Availability from '../components/Availability';
import {AddAvailability} from "../components/addAvailability";


function Events() {
  return (
    <div className='Events'>
      {/* <h2>Events</h2> */}
      {/* <div><h1 className='middle-text'>Events</h1></div><br/><br/> */}
      <div><AddAvailability/></div> 
      <div className="Calendar"> <Availability/> </div>
    </div>
  );
}

export default Events;