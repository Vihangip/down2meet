
import React from 'react';
import Event from '../components/Event';
import {AddEvent} from "../components/addEvent";
import Calendar from '../components/Calendar';


function Events() {
  return (
    <div className='Events'>
      {/* <h2>Events</h2> */}
      {/* <div><h1 className='middle-text'>Events</h1></div><br/><br/> */}
      <div><AddEvent/></div> 
      <div className="Calendar"> <Event/> </div>

      <div className="Calendar"> <Calendar/> </div> 
    </div>
  );
}

export default Events;