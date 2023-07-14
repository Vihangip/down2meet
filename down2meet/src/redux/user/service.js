import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getUsers = async () => {
    const res = await fetch(`http://localhost:3001/users`,
    {
        method: "GET",
    });
    const data = await res.json();
    return data;
}

const getOneUser = async (userID) => {
    console.log(userID);
    const res = await fetch(`http://localhost:3001/users/${userID}`,
    {
        method: "GET",
    });
    const data = await res.json();

    console.log(res.status);

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
    console.log("account added");
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