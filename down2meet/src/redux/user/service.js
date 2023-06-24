const getUser = async () => {
    const res = await fetch(`http://localhost:3001/user`,
    {
        method: "GET",
    });
    const data = await res.json();
    return data;
}

const addUser = async (user) => {
    const res = await fetch(`http://localhost:3001/user`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    const data = await res.json();
    if (res.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
}

const deleteUser = async (userID) => {
    const res = await fetch(`http://localhost:3001/user/${userID}`,
    {
        method: "DELETE",
    });
    const data = await res.text();
    return data;
}

export default {
    getUser, addUser, deleteUser
}