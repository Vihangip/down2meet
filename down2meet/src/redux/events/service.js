const getEvents = async () => {
    const res = await fetch(`http://localhost:3001/events`,
    {
        method: "GET",
    });
    const data = await res.json();
    return data;
}

const addEvents = async (event) => {
    const res = await fetch(`http://localhost:3001/events`,
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
    return data;
}

const deleteEvents = async (eventID) => {
    const res = await fetch(`http://localhost:3001/events/${eventID}`,
    {
        method: "DELETE",
    });
    const data = await res.text();
    return data;
}

export default {
    getEvents, addEvents, deleteEvents
}