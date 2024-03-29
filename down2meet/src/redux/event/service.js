const getEvent = async (userID) => {
    const res = await fetch(`${process.env.REACT_APP_URL3001}/event/${userID}`,
    {
        method: "GET",
        credentials: 'include',
    });
    const data = await res.json();
    return data;
}

const addEvent = async (event) => {
    const res = await fetch(`${process.env.REACT_APP_URL3001}/event`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
        credentials: 'include',
    });
    const data = await res.json();
    if (res.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
}

const deleteEvent = async (eventID) => {
    const res = await fetch(`${process.env.REACT_APP_URL3001}/event/${eventID}`,
    {
        method: "DELETE",
        credentials: 'include',
    });
    if (res.status !== 204) {
        const errorMsg = "error";
        throw new Error(errorMsg)
    }
    return eventID;
}

const removeEventParticipant = async (eventID, userID) => {
    const res = await fetch(`${process.env.REACT_APP_URL3001}/event/${eventID}/participant/${userID}`,
    {
        method: "DELETE",
        credentials: 'include',
    });
    if (res.status !== 204) {
        const errorMsg = "error";
        throw new Error(errorMsg)
    }
    return eventID;
}

const updateEvent = async (event) => {
    const response = await fetch(`${process.env.REACT_APP_URL3001}/event/` + event.title, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event),
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.status.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg)
    }

    return data;

  };
  

export default {
    getEvent, addEvent, deleteEvent, removeEventParticipant, updateEvent
}