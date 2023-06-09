

export default function SocialGroups() {
    return (
        <div className="SocialGroups">
            <div className="HomePage">
                <i className="fa-solid fa-house"></i>
                <button className="SGButton">Home</button>
            </div>
            <div className="Friends">
                <i className="fa-solid fa-user"></i>
                <button className="SGButton">Friends</button>
            </div>
            <div className="CurrentEvents">
                <i className="fa-solid fa-calendar-days"></i>
                <button className="SGButton">Current Events</button> 
            </div>
            <div className="Groups">
                <i className="fa-solid fa-people-group"></i>
                <button className="SGButton">Groups</button>
            </div>
        </div>
    );
}