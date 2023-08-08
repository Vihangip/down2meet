import { useEffect } from 'react';
import ApiCalendar from 'react-google-calendar-api';
import { googleEvent } from "./addEvent";
import { useDispatch } from 'react-redux';
import { postEvent } from "./Post"; 
import { postbarEvent } from "./PostBar"; 
import { signInCalendar} from '../actions/actions';

const config = {
  clientId: "1011482531322-6d1dp35f941hr37vnn7cvjdstntunnru.apps.googleusercontent.com",
  apiKey: "AIzaSyDwUAUOzBUBdUB35If5Q5bgZHry2TiU05g",
  scope: 'https://www.googleapis.com/auth/calendar',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
  hosted_domain: `${process.env.REACT_APP_URL3000}`,
  redirect_uri: `${process.env.REACT_APP_URL3000}/Events`
};


let newEvent = new Date();


export const apiCalendar = new ApiCalendar(config);


export function handleCreateEvent({origin}) {

  let sourceEvent;
  if (origin==="addEvent") {
    sourceEvent = googleEvent;
  } else if (origin==="Post") {
    sourceEvent = postEvent;
  } else if (origin==="PostBar") {
    sourceEvent = postbarEvent;
  }
  
  if (newEvent) {
    let date = new Date(sourceEvent.startingDate);
    let year = new Date(date).toLocaleDateString('en-US', { year: 'numeric' });
    let month = new Date(date).toLocaleDateString('en-US', { month: 'numeric' });
    let day = new Date(date).toLocaleDateString('en-US', { day: 'numeric' });
    const startTime = new Date(date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    let hour, minute, ampm;
    [hour, minute] = startTime.split(':');
    [minute, ampm] = minute.split(' ');

    if (ampm === "PM") {
      hour = parseInt(hour, 10) + 12;
    }

    const startDate = new Date();
    startDate.setFullYear(year);
    startDate.setMonth(month-1);
    startDate.setDate(day);
    startDate.setHours(hour);
    startDate.setMinutes(minute);

    date = new Date(sourceEvent.endingDate);
    year = new Date(date).toLocaleDateString('en-US', { year: 'numeric' });
    month = new Date(date).toLocaleDateString('en-US', { month: 'numeric' });
    day = new Date(date).toLocaleDateString('en-US', { day: 'numeric' });
    const endTime = new Date(date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    [hour, minute] = endTime.split(':');
    [minute, ampm] = minute.split(' ');

    if (ampm === "PM") {
      hour = parseInt(hour, 10) + 12;
    }

    const endDate = new Date();
    endDate.setFullYear(year);
    endDate.setMonth(month-1);
    endDate.setDate(day);
    endDate.setHours(hour);
    endDate.setMinutes(minute);

    const event = {
      summary: sourceEvent.title,
      description: sourceEvent.description,
      start: {
        dateTime: startDate.toISOString(),
        timeZone: 'America/Vancouver',
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: 'America/Vancouver',
      },
    };
    apiCalendar.createEvent(event)
      .then((result) => {
      })
      .catch((error) => {
      });
  }


};



const Calendar = () => {
  const dispatch = useDispatch();

  const handleItemClick = (event, name) => {

    if (name === 'sign-in') {
      apiCalendar.onLoad(() => {
        apiCalendar.handleClientLoad();
        apiCalendar.handleAuthClick();
      });
      apiCalendar.initGapiClient();
      dispatch(signInCalendar(true));
    } else if (name === 'sign-out') {
      apiCalendar.handleSignoutClick();
    }
  };

  useEffect(() => {
    newEvent = googleEvent;
  }, []);


  return (
    <div>
      <div style={{ padding: '0.5em' }}>
        <button className='AvailabilityButton4' onClick={(e) => handleItemClick(e, 'sign-in')}>Connect to Google Calendar</button>
      </div>

    </div>
  );
};

export default Calendar;
