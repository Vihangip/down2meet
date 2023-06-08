

const Post = ({post}) => {

    return (
        <div className="Post">
            <div className="Post-UserInfo">
                <img className="Post-UserInfo-Image" src={post.profilepic} alt=""></img>
                <p>{post.name}</p>
            </div>
            <p>{post.status}</p>
        </div>
    )
}

export default Post;