const getPosts = async () => {
    const res = await fetch(`http://localhost:3001/posts`,
    {
        method: "GET",
        credentials: 'include',
    });
    const data = await res.json();
    return data;
}

const addPost = async (post) => {
    const res = await fetch(`http://localhost:3001/posts`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(post),
    });
    const data = await res.json();
    if (res.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
}

const deletePost = async (postID) => {
    const res = await fetch(`http://localhost:3001/posts/${postID}`,
    {
        method: "DELETE",
        credentials: 'include',
    });
    const data = await res.text();
    return data;
}

export default {
    getPosts, addPost, deletePost
}