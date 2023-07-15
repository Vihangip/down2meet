import { useState, useEffect } from 'react';
import ApiCalendar from 'react-google-calendar-api';
import { googleEvent } from "./addEvent";
import { useSelector } from 'react-redux';

const config = {
  clientId: "1011482531322-6d1dp35f941hr37vnn7cvjdstntunnru.apps.googleusercontent.com",
  apiKey: "AIzaSyDwUAUOzBUBdUB35If5Q5bgZHry2TiU05g",
  scope: 'https://www.googleapis.com/auth/calendar',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
};

let newEvent = new Date();

const apiCalendar = new ApiCalendar(config);

export function handleCreateEvent() {
  if (newEvent) {

    //start time
    let date = new Date(googleEvent.startingDate);
    let year = new Date(date).toLocaleDateString('en-US', { year: 'numeric' });
    let month = new Date(date).toLocaleDateString('en-US', { month: 'numeric' });
    let day = new Date(date).toLocaleDateString('en-US', { day: 'numeric' });
    const startTime = new Date(date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    let [hour, minute] = startTime.split(':');
    minute = minute.split(' ')[0];

    const startDate = new Date();
    startDate.setFullYear(year);
    startDate.setMonth(month-1);
    startDate.setDate(day);
    startDate.setHours(hour);
    startDate.setMinutes(minute);

    //end time
    date = new Date(googleEvent.endingDate);
    year = new Date(date).toLocaleDateString('en-US', { year: 'numeric' });
    month = new Date(date).toLocaleDateString('en-US', { month: 'numeric' });
    day = new Date(date).toLocaleDateString('en-US', { day: 'numeric' });
    const endTime = new Date(date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    [hour, minute] = endTime.split(':');
    minute = minute.split(' ')[0];

    const endDate = new Date();
    endDate.setFullYear(year);
    endDate.setMonth(month-1);
    endDate.setDate(day);
    endDate.setHours(hour);
    endDate.setMinutes(minute);

    console.log(year);
    console.log(month);
    console.log(day);
    console.log(hour);
    console.log(minute);

    const event = {
      summary: googleEvent.title,
      desciption: googleEvent.description,
      start: {
        dateTime: startDate.toISOString(),
        timeZone: 'America/Vancouver',
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: 'America/Vancouver',
      },
    };

    console.log(event);

    apiCalendar.createEvent(event)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

const Calendar = () => {
  const [events, setEvents] = useState([]);
  //const [newEvent, setNewEvent] = useState(new Date());

  useEffect(() => {
    console.log("Calendar google Event");
    console.log(googleEvent);
    //setNewEvent(googleEvent);
    newEvent = googleEvent;
  }, []);

  const handleItemClick = (event, name) => {
    if (name === 'sign-in') {
      apiCalendar.handleAuthClick();
    } else if (name === 'sign-out') {
      apiCalendar.handleSignoutClick();
    }
  };

  return (
    <div>
      <div style={{ padding: '0.5em' }}>
        <button onClick={(e) => handleItemClick(e, 'sign-in')}>sign-in</button>
        <button onClick={(e) => handleItemClick(e, 'sign-out')}>sign-out</button>
      </div>
      <div style={{ padding: '0.5em' }}>
        <button
          onClick={(e) => {
            apiCalendar.listUpcomingEvents(10)
              .then(({ result }) => {
                console.log(result.items);
                setEvents(result.items);
              });
          }}
        >
          List upcoming events
        </button>
        <div>
          <h4>Events</h4>
          {events.length === 0 && <p>No events to show</p>}
          {events.map((event) => (
            <p key={event.id}>{JSON.stringify(event)}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
