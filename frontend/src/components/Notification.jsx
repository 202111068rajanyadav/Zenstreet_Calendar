// src/Notification.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Notification = ({ events }) => {
    const [showNotification, setShowNotification] = useState(false);
    const [upcomingEvent, setUpcomingEvent] = useState(null);
    const [snoozeTime, setSnoozeTime] = useState(null); // Track snooze state

    useEffect(() => {
        if (events) {
            // Convert the object of objects to an array
            const eventsArray = Object.values(events);
            console.log(eventsArray, "eventsArray");

            const checkEventTime = () => {
                const now = new Date();

                // Loop through each event to check if it starts in the next 5 minutes
                eventsArray.forEach(event => {
                    console.log(event.start);
                    const startTime = new Date(event.start);
                    console.log(now);
                    const timeDifference = startTime - now;

                    console.log(event, " time diff ", timeDifference);

                    // If the event is within the next 5 minutes and snooze time has passed or there's no snooze
                    if (timeDifference > 0 && timeDifference <= 5 * 60 * 1000 && (!snoozeTime || now - snoozeTime >= 5 * 60 * 1000)) {
                        setUpcomingEvent(event);
                        setShowNotification(true);
                        console.log(upcomingEvent, " up ka event ");
                    }
                });
            };

            // Check initially
            checkEventTime();

            // Set interval to check every minute
            const timer = setInterval(checkEventTime, 60000);

            // Cleanup the interval on component unmount
            return () => clearInterval(timer);
        }
    }, [events, snoozeTime]); // Re-run if snoozeTime changes

    const handleCloseNotification = () => {
        setShowNotification(false);
    };

    const handleSnooze = () => {
        // Set the snooze time to the current time
        setSnoozeTime(new Date());
        setShowNotification(false); // Close notification for now
    };

    return (
        showNotification && upcomingEvent && (
            <div className="position-fixed top-0 start-0 p-3" style={{ zIndex: 1050, maxWidth: "300px" }}>
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <h4 className="alert-heading">
                        {upcomingEvent.title ? <div>{upcomingEvent.title}</div> : <div>No event</div>}
                    </h4>
                    <p>{upcomingEvent.describe? <div>{upcomingEvent.describe}</div> : <div>No event</div>}</p>
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={handleCloseNotification}
                    ></button>
                    <button
                        type="button"
                        className="btn btn-warning btn-sm"
                        onClick={handleSnooze}
                    >
                        Snooze for 5 mins
                    </button>
                </div>
            </div>
        )
    );
};

export default Notification;
