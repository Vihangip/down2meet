const UserView = ({user}) => {

    return (
        <div className="UserView">
            <img src={user.picture} alt="user" />
            <h2>{user.name}</h2>
        </div>
    )
}

export default UserView;