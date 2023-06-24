import React from 'react';
import Event from './Event';
import EmptyEvent from './EmptyEvent';
import { useSelector, useDispatch } from 'react-redux';



export default function Calendar() {
    const events = useSelector((state) => state.events);
    const dispatch = useDispatch();
    const currentDate = new Date();

    const weekdays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
      weekdays.push(date);
    }

    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(i);
    }

    return (
      <div className="Calendar">
        <h1>Weekly Schedule</h1>
        <table className='Calendar-table'>
          <thead className='Calendar-thead'>
            <tr>
              {weekdays.map((weekday, index) => (
                <th key={index}>{weekday.toLocaleDateString('en-US', { weekday: 'short' })}</th>
              ))}
            </tr>
          </thead>
          <tbody className='Calendar-thead'>
          {hours.map((hour) => (
            (hour >= 7) && (
              <tr key={hour}>
                {weekdays.map((weekday, index) => (
                  <td key={index}>
                    <EmptyEvent weekday={weekday} hour={hour} />
                  </td>
                ))}
              </tr>
            )))}
          {hours.map((hour) => (
            (hour <= 2 ) && (
              <tr key={hour}>
                {weekdays.map((weekday, index) => (
                  <td key={index}>
                    <EmptyEvent weekday={weekday} hour={hour} />
                  </td>
                ))}
              </tr>
              )))}
          </tbody>
        </table>
      </div>
    );
}
