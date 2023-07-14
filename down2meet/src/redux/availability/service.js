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
    console.log("service: addAvailability");
    console.log(data);
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

const updateAvailability = async (availability) => {
    const response = await fetch('http://localhost:3001/availability/' + availability.title, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(availability)
    });
    const data = await response.json();
    if (!response.status.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg)
    }

    return data;

  };
  

export default {
    getAvailability, addAvailability, deleteAvailability, updateAvailability
}