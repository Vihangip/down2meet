const getFriends = async () => {
    const res = await fetch(`http://localhost:3001/friends`,
    {
        method: "GET",
    });
    const data = await res.json();
    return data;
}

const addFriend = async (friend) => {
    const res = await fetch(`http://localhost:3001/friends`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(friend),
    });
    const data = await res.json();
    if (res.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
}

const deleteFriend = async (userID) => {
    const res = await fetch(`http://localhost:3001/friends/${userID}`,
    {
        method: "DELETE",
    });
    const data = await res.text();
    return data;
}

export default {
    getFriends, addFriend, deleteFriend
}