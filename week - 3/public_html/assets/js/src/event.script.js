const EventManager = {
    
    eventCollection : [],
    currentEventId  : 0,

    getEventCollection() {
        return EventManager.eventCollection;
    },
    
    incrementEventId() {
        EventManager.currentEventId++;
    },
    
    getCurrentEventId() {
        return EventManager.currentEventId;
    }
};

function Event(name, due) {
    this.id        = 0;
    this.name      = name;
    this.due       = due;
    this.dateAdded = new Date();
    EventManager.incrementEventId();
}

function addEvent(event) {
    if (event.name != null && event.name != "") {
        EventManager.getEventCollection().push(event);
    }
}

function removeEventById(id) {

    let event = EventManager.getEventCollection().find(event => event.id == id);

    if (id < 0) {
        throw new Error("The Event ID cannot be negative.");
    }

    if (!event) {
        throw new Error("An Event with this id doesn't exist.");
    }

    let eventId = EventManager.getEventCollection().indexOf(event);
    EventManager.getEventCollection().splice(eventId, 1);
    return true;
}
