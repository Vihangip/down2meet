import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';
import { useEffect } from "react";
import { setUser } from '../redux/user/reducer';
import { getOneUserAsync, getSessionUserAsync } from '../redux/user/thunks';
import { editUserAsync } from '../redux/user/thunks';


const EditView = ({ onClose, user_id }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPostsAndUsers = async () => {
          try {
            let storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
              dispatch(setUser(storedUser));
            } else {
            await dispatch(getSessionUserAsync());
            storedUser = JSON.parse(localStorage.getItem('user'));
            }
          }
          catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchPostsAndUsers();
    }, []); 
    
    const user = useSelector(state => state.users.user);

    const [new_name, setName] = useState(user.name);
    const [new_picture, setPicture] = useState(user.picture);

    const handleSave = () => {
        const editedUser = 
            { 
                user_id: user.user_id,
                email: user.email,
                name: new_name,
                picture: new_picture,
                friends: user.friends,
                groups: user.groups,
                events: user.events,
                hangouts: user.hangouts,
                availability: user.availability
            }
        dispatch(editUserAsync(editedUser));
        dispatch(getOneUserAsync(user_id)); 
        localStorage.setItem('user', JSON.stringify(editedUser));
        dispatch(setUser(editedUser));
    }

    return (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        <span id="dialogClose" className="dialog-close" onClick={onClose}>&times;</span>

                        <div className="vertical edit">
                            <p> Name: </p>
                            <input type="text" value={new_name} onChange={(e) => setName(e.target.value)}/>
                            <p> Profile Picture URL: </p>
                            <input type="text" value={new_picture} onChange={(e) => setPicture(e.target.value)}/>
                        </div>

                        <br />
                        <button className="buttons" onClick={handleSave}> Save </button>
                    </div>
                </div>
        
    );      

};
export default EditView;