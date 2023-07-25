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
    </div>
  );
}

export default Events;