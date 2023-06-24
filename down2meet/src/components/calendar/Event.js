

export default function Event(weekday) {
    const handleHourClick = () => {
        console.log(weekday);
    }
    return (
        <div className="Event">
            <button className="Event-Button" onClick={handleHourClick}></button>
        </div>
    );
}