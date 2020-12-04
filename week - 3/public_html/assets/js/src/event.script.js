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
};