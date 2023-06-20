

const Friend = ({ name, profilepic, availability }) => {

    return (
        <div>
        <div className="friend-container">
          <img className="friend-image" src={profilepic} alt={name} />
          <div className="friend-info">
            <p className="friend-name">{name}</p>
            {availability ? <p className="friend-available">Available</p> : <p className="friend-busy">Not Available</p>}
          <button>See Profile</button>
          </div>
          
        </div>
        <hr></hr>
        </div>
      );
}

export default Friend;