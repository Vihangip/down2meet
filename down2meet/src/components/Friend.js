
import { useNavigate } from "react-router-dom";

const Friend = ({ name, profilepic, availability, onRemove }) => {

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onRemove();
  };

  const navigate = useNavigate(); 
  const handleProfileClick = () => {
    //navigate('/FriendProfile', { state: { name, profilepic, availability } });   ///////
  };

  return (
      <div>
      <div className="friend-container">
        <img className="friend-image" src={profilepic} alt={name} />
        <div className="friend-info">
          <p className="friend-name">{name}</p>
          {availability ? <p className="friend-available">Available</p> : <p className="friend-busy">Not Available</p>}
        <button onClick={handleProfileClick}>See Profile</button>
        <button onClick={handleDeleteClick} >Delete Friend</button>
        </div>

      </div>
      <hr></hr>
      </div>
    );
}

export default Friend;