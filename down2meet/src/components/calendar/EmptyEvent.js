

export default function EmptyEvent({weekday, hour}) {
    const handleHourClick = () => {
        console.log(weekday);
    }
    return (
        <div className="EmptyEvent">
            <p>{hour}:00</p>
        </div>
    );
}