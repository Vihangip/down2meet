import BodyHeader from "../components/BodyHeader";
import React from 'react';
import Event from '../components/Event';
import {AddEvent} from "../components/addEvent";
import Calendar from '../components/Calendar';


function Events() {

  return (
    <div className='Events'>
      <BodyHeader title={"Events"}/>
      <div className="Events">
        <div><AddEvent/></div> 
      
        <div className="Calendar"> <Calendar/> </div> 
       <div className="Calendar"> <Event/> </div>

      </div>
      {/* <h2>Events</h2> */}
      {/* <div><h1 className='middle-text'>Events</h1></div><br/><br/> */}
      
    </div>
  );
}

export default Events;