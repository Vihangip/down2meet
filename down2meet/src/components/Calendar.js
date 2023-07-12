
import { useState, useEffect } from 'react';
import ApiCalendar from 'react-google-calendar-api';
import {endDate, startDate, details} from "./addAvailability";


import { eventsList } from '../assets/eventsList';

//import EventsList from '../assets/eventsList.json'; //store all events (for now; have to be moved to server eventually)

const config = {
  clientId: "1011482531322-6d1dp35f941hr37vnn7cvjdstntunnru.apps.googleusercontent.com",//process.env.REACT_APP_CLIENT_ID,
  apiKey: "AIzaSyDwUAUOzBUBdUB35If5Q5bgZHry2TiU05g", //process.env.REACT_APP_API_KEY,
  scope: 'https://www.googleapis.com/auth/calendar',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
};

const apiCalendar = new ApiCalendar(config);
// Use the `apiCalendar` instance to interact with the Google Calendar API


const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [calendars, setCalendars] = useState([]);

  const handleItemClick = (event, name) => {
    if (name === 'sign-in') {
      apiCalendar.handleAuthClick();
    } else if (name === 'sign-out') {
      apiCalendar.handleSignoutClick();
    }
  };


  useEffect(() => {
    //write to calendar to be displayed

   // localStorage.setItem('eventsList', JSON.stringify(eventsList));
    //const eventsData = JSON.parse(localStorage.getItem('eventsList'));

    const eventsData = eventsList.list;

    const available2Event = eventsData.find(event => event.title === 'Available 2');
    if (available2Event) {
      available2Event.start = '2023-06-25T15:30:00';
    }

    //write to server
    //eventsList.list.available2Event

  }, [events]); //when google calendar is updated


    
  return (
    <div>
      <div style={{ padding: '0.5em' }}>
        <button onClick={(e) => handleItemClick(e, 'sign-in')}>sign-in</button>
        <button onClick={(e) => handleItemClick(e, 'sign-out')}>sign-out</button>
      </div>
      <div style={{ padding: '0.5em' }}>
        <button
          onClick={(e) => {
            const startDate = new Date();
            startDate.setFullYear(startDate[0]);
            startDate.setMonth(startDate[1]); //month is 0 indexing *eg. 6 = July)
            startDate.setDate(startDate[2]); //day is 1 indexing
            startDate.setHours(10);
            startDate.setMinutes(0);

            const endDate = new Date();
            endDate.setFullYear(endDate[0]);
            endDate.setMonth(endDate[1]);
            endDate.setDate(endDate[2]);
            endDate.setHours(11);
            endDate.setMinutes(30);

            const newEvent = {
              summary: 'Down2Meet: Event',
              start: {
                dateTime: startDate.toISOString(), // Convert to ISO string
                timeZone: 'America/Vancouver',
              },
              end: {
                dateTime: endDate.toISOString(), // Convert to ISO string
                timeZone: 'America/Vancouver',
              },
            };

            apiCalendar
              .createEvent(newEvent)
              .then((result) => {
                console.log(result);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          Create Dummy Event
        </button>

      </div>

      <div style={{ padding: '0.5em' }}>
        <button
          onClick={(e) => {
            apiCalendar.listUpcomingEvents(10).then(({ result }) => {
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
      <div style={{ padding: '0.5em' }}>
        <button
          onClick={(e) => {
            apiCalendar.listCalendars().then(({ result }) => {
              console.log(result.items);
              setCalendars(result.items);
            });
          }}
        >
          List calendars
        </button>
        <div>
          <h4>Calendars</h4>
          {calendars.length === 0 && <p>No calendars to show</p>}
          {calendars.map((calendar) => (
            <p key={calendar.id}>{JSON.stringify(calendar)}</p>
          ))}
        </div>
      </div>
      <div style={{ padding: '0.5em' }}>
        <button
          onClick={(e) => {
            apiCalendar.createCalendar('myCalendar2').then(({ result }) => {
              console.log(result);
            });
          }}
        >
          Create calendar
        </button>
      </div>
    </div>
  );
};

export default Calendar;
