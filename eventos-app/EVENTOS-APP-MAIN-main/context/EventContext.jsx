import React, { createContext, useState, useContext } from "react";

const EventContext = createContext();

export const EventProvider = ({children}) => {
    const [events, setEvents] = useState([]);

    const addEvent = (event) => {
        setEvents((prev) => [...prev, event]);
    };

    const removeEvent = (eventName) => {
        setEvents((prevEvents) => prevEvents.filter(event => event.name !== eventName))
    }

    return (
        <EventContext.Provider value={{ events, addEvent, removeEvent }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEvent = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEvent deve ser usado dentro de um EventProvider')
    }
    return context
};
