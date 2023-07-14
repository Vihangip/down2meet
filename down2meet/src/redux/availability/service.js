const getAvailability = async () => {
    const res = await fetch(`http://localhost:3001/availability`,
    {
        method: "GET",
    });
    const data = await res.json();
    return data;
}

const addAvailability = async (availability) => {
    const res = await fetch(`http://localhost:3001/availability`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(availability),
    });
    const data = await res.json();
    if (res.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
}

const deleteAvailability = async (availabilityID) => {
    const res = await fetch(`http://localhost:3001/availability/${availabilityID}`,
    {
        method: "DELETE",
    });
    const data = await res.text();
    return data;
}

export default {
    getAvailability, addAvailability, deleteAvailability
}