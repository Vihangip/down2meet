const getEvents = async () => {
    const res = await fetch('http://localhost:3001/events',
    {
        method: 'GET',
    });
    const data = await res.json();
    return data;
}

const addEvent = async (event) => {
    const res = await fetch('http://localhost:3001/events',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event),
    });
    const data = await res.json();
    if (!res.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg);
    }
    return data;
}

const deleteEvent = async (eventID) => {
    const res = await fetch(`http://localhost:3001/events/${eventID}`,
    {
        method: 'DELETE',
    });

    const data = await res.text();
    return data;
}

const updateEvent = async (eventID, event) => {
    const res = await fetch(`http://localhost:3001/events/${eventID}`,
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event),
    });
    const data = await res.json();
    if (!res.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg);
    }

    return data;
}

export default {
    getEvents,
    addEvent,
    deleteEvent,
    updateEvent,
}