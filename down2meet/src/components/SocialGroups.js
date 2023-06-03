

export default function SocialGroups() {
    return (
        <div className="SocialGroups">
            <div className="HomePage">
                <i class="fa-solid fa-house"></i>
                <button className="SGButton">Home</button>
            </div>
            <div className="Friends">
                <i class="fa-solid fa-user"></i>
                <button className="SGButton">Friends</button>
            </div>
            <div className="CurrentEvents">
                <i class="fa-solid fa-calendar-days"></i>
                <button className="SGButton">Current Events</button> 
            </div>
            <div className="Groups">
                <i class="fa-solid fa-people-group"></i>
                <button className="SGButton">Groups</button>
            </div>
        </div>
    );
}