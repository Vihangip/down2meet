const getEvent = async (userID) => {
    console.log("client service getting events");
    const res = await fetch(`http://localhost:3001/event/${userID}`,
    {
        method: "GET",
    });
    const data = await res.json();
    return data;
}

const addEvent = async (event) => {
    const res = await fetch(`http://localhost:3001/event`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
    });
    const data = await res.json();
    if (res.status >= 400) {
        throw new Error(data.errors);
    }
    console.log("service: addEvent");
    console.log(data);
    return data;
}

const deleteEvent = async (eventID) => {
    const res = await fetch(`http://localhost:3001/event/${eventID}`,
    {
        method: "DELETE",
    });
    if (res.status !== 204) {
        const errorMsg = "error";
        throw new Error(errorMsg)
    }
    return eventID;
}

// TODO: not part of standard requirements
const updateEvent = async (event) => {
    const response = await fetch('http://localhost:3001/event/' + event.title, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    });
    const data = await response.json();
    if (!response.status.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg)
    }

    return data;

  };
  

export default {
    getEvent, addEvent, deleteEvent, updateEvent
}