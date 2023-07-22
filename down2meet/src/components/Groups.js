import { deleteEventAsync } from "../redux/event/thunks";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';


export default function Groups(props) {
    let groupsList = useSelector(state =>state.groups.groupsList);
    console.log(groupsList);
    // const [selectedEvent, setSelectedEvent] = useState(null);
    return (
        <div>
            {groupsList.map((group) => (
                <div key={group.id}>
                  <h4>{group.name}</h4>
                  <p>{group.members.map((member) => (
                    {member}))}
                    </p>
                </div>))}

        </div>
    );
};