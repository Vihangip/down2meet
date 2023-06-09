const getUsers = async () => {
    const res = await fetch(`http://localhost:3001/users`,
    {
        method: "GET",
    });
    const data = await res.json();
    return data;
}

const getOneUser = async ({userID}) => {
    const res = await fetch(`http://localhost:3001/users/${userID}`,
    {
        method: "GET",
    });
    const data = await res.json();
    //TODO !!!!!!!!!!
    if (res.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
}

const addUsers = async (user) => {
    const res = await fetch(`http://localhost:3001/users`,
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

const deleteUsers = async (userID) => {
    const res = await fetch(`http://localhost:3001/users/${userID}`,
    {
        method: "DELETE",
    });
    const data = await res.text();
    return data;
}

export default {
    getUsers, addUsers, deleteUsers, getOneUser
}