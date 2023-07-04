
import { useState } from 'react';
import ApiCalendar from 'react-google-calendar-api';
import {endDate, startDate, details} from "./addAvailability";



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




///////////////


/* global gapi, google */

/*

import { useState, useEffect } from 'react';

const scriptSrcGoogle = "https://accounts.google.com/gsi/client";
const scriptSrcGapi = "https://apis.google.com/js/api.js";

class ApiCalendar {
  constructor(config) {
    this.config = config;
    this.tokenClient = null;
    this.onLoadCallback = null;
    this.calendar = "primary";

    try {
      this.initGapiClient = this.initGapiClient.bind(this);
      this.handleSignoutClick = this.handleSignoutClick.bind(this);
      this.handleAuthClick = this.handleAuthClick.bind(this);
      this.createEvent = this.createEvent.bind(this);
      this.listUpcomingEvents = this.listUpcomingEvents.bind(this);
      this.listEvents = this.listEvents.bind(this);
      this.createEventFromNow = this.createEventFromNow.bind(this);
      this.onLoad = this.onLoad.bind(this);
      this.setCalendar = this.setCalendar.bind(this);
      this.updateEvent = this.updateEvent.bind(this);
      this.deleteEvent = this.deleteEvent.bind(this);
      this.getEvent = this.getEvent.bind(this);
      this.handleClientLoad();
    } catch (e) {
      console.log(e);
    }
  }

  get sign() {
    return !!this.tokenClient;
  }

  initGapiClient() {
    gapi.client
      .init({
        apiKey: this.config.apiKey,
        discoveryDocs: this.config.discoveryDocs,
        hosted_domain: this.config.hosted_domain,
      })
      .then(() => {
        if (this.onLoadCallback) {
          this.onLoadCallback();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleClientLoad() {
    const scriptGoogle = document.createElement("script");
    const scriptGapi = document.createElement("script");
    scriptGoogle.src = scriptSrcGoogle;
    scriptGoogle.async = true;
    scriptGoogle.defer = true;
    scriptGapi.src = scriptSrcGapi;
    scriptGapi.async = true;
    scriptGapi.defer = true;
    document.body.appendChild(scriptGapi);
    document.body.appendChild(scriptGoogle);
    scriptGapi.onload = () => {
      gapi.load("client", this.initGapiClient);
    };
    scriptGoogle.onload = async () => {
      this.tokenClient = await google.accounts.oauth2.initTokenClient({
        client_id: this.config.clientId,
        scope: this.config.scope,
        prompt: "",
        callback: () => {},
      });
    };
  }

  handleAuthClick() {
    if (gapi && this.tokenClient) {
      if (gapi.client.getToken() === null) {
        this.tokenClient.requestAccessToken({ prompt: "consent" });
      } else {
        this.tokenClient.requestAccessToken({
          prompt: "",
        });
      }
    } else {
      console.error("Error: this.gapi not loaded");
      new Error("Error: this.gapi not loaded");
    }
  }

  setCalendar(newCalendar) {
    this.calendar = newCalendar;
  }

  onLoad(callback) {
    if (gapi) {
      callback();
    } else {
      this.onLoadCallback = callback;
    }
  }

  handleSignoutClick() {
    if (gapi) {
      const token = gapi.client.getToken();
      if (token !== null) {
        google.accounts.id.disableAutoSelect();
        google.accounts.oauth2.revoke(token.access_token, () => {});
        gapi.client.setToken(null);
      }
    } else {
      console.error("Error: this.gapi not loaded");
    }
  }

  listUpcomingEvents(maxResults, calendarId = this.calendar) {
    if (gapi) {
      return gapi.client.calendar.events.list({
        calendarId: calendarId,
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: maxResults,
        orderBy: "startTime",
      });
    } else {
      console.error("Error: this.gapi not loaded");
      return false;
    }
  }

  listEvents(queryOptions, calendarId = this.calendar) {
    if (gapi) {
      return gapi.client.calendar.events.list({
        calendarId,
        ...queryOptions,
      });
    } else {
      console.error("Error: gapi not loaded");
      return false;
    }
  }

  createEventFromNow(
    { time, summary, description = "" },
    calendarId = this.calendar,
    timeZone = "Europe/Paris"
  ) {
    const event = {
      summary,
      description,
      start: {
        dateTime: new Date().toISOString(),
        timeZone: timeZone,
      },
      end: {
        dateTime: new Date(new Date().getTime() + time * 60000).toISOString(),
        timeZone: timeZone,
      },
    };

    return this.createEvent(event, calendarId);
  }

  createEvent(
    event,
    calendarId = this.calendar,
    sendUpdates = "none"
  ) {
    if (gapi.client.getToken()) {
      return gapi.client.calendar.events.insert({
        calendarId: calendarId,
        resource: event,
        sendUpdates,
        conferenceDataVersion: 1,
      });
    } else {
      console.error("Error: this.gapi not loaded");
      return false;
    }
  }

  createEventWithVideoConference(
    event,
    calendarId = this.calendar,
    sendUpdates = "none"
  ) {
    return this.createEvent(
      {
        ...event,
        conferenceData: {
          createRequest: {
            requestId: crypto.randomUUID(),
            conferenceSolutionKey: {
              type: "hangoutsMeet",
            },
          },
        },
      },
      calendarId,
      sendUpdates
    );
  }

  deleteEvent(eventId, calendarId = this.calendar) {
    if (gapi) {
      return gapi.client.calendar.events.delete({
        calendarId: calendarId,
        eventId: eventId,
      });
    } else {
      console.error("Error: gapi is not loaded use onLoad before please.");
      return null;
    }
  }

  updateEvent(
    event,
    eventId,
    calendarId = this.calendar,
    sendUpdates = "none"
  ) {
    if (gapi) {
      return gapi.client.calendar.events.patch({
        calendarId: calendarId,
        eventId: eventId,
        resource: event,
        sendUpdates: sendUpdates,
      });
    } else {
      console.error("Error: gapi is not loaded use onLoad before please.");
      return null;
    }
  }

  getEvent(eventId, calendarId = this.calendar) {
    if (gapi) {
      return gapi.client.calendar.events.get({
        calendarId: calendarId,
        eventId: eventId,
      });
    } else {
      console.error("Error: gapi is not loaded use onLoad before please.");
      return null;
    }
  }

  listCalendars() {
    if (gapi) {
      return gapi.client.calendar.calendarList.list();
    } else {
      console.error("Error: gapi is not loaded use onLoad before please.");
      return null;
    }
  }

  createCalendar(summary) {
    if (gapi) {
      return gapi.client.calendar.calendars.insert({ summary: summary });
    } else {
      console.error("Error: gapi is not loaded use onLoad before please.");
      return null;
    }
  }
}

export default ApiCalendar;

*/