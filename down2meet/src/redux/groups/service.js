const getGroups = async () => {
    const res = await fetch(`${process.env.REACT_APP_URL3001}/groups`,
    {
        method: "GET",
        credentials: 'include',
    });
    const data = await res.json();
    return data;
}

const addGroups = async (group) => {
    const res = await fetch(`${process.env.REACT_APP_URL3001}/groups`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(group),
        credentials: 'include',
    });
    const data = await res.json();
    if (res.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
}

const deleteGroups = async (groupID) => {
    const res = await fetch(`${process.env.REACT_APP_URL3001}/groups/${groupID}`,
    {
        method: "DELETE",
        credentials: 'include',
    });
    const data = await res.text();
    return data;
}

export default {
    getGroups, addGroups, deleteGroups
}