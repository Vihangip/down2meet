import { NavLink } from "react-router-dom";

export default function SocialGroups() {
    return (
        <nav className="SocialGroups">
            <NavLink className="HomePage" to="/">
                <i className="fa-solid fa-house"></i>
                <button className="SGButton">Home</button>
            </NavLink>
            <NavLink className="Friends" to="/Friends">
                <i className="fa-solid fa-user"></i>
                <button className="SGButton">Friends</button>
            </NavLink>

            <NavLink className="Events" to="/Events">
                <i className="fa-solid fa-calendar-days"></i>
                <button className="SGButton">Events</button> 
            </NavLink>
      
            <NavLink className="Groups" to="/Groups">
                <i class="fa-solid fa-people-group"></i>
                <button className="SGButton">Groups</button>
            </NavLink>
        </nav>
    );
}