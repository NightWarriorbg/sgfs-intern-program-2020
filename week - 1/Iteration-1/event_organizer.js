//Collection to store the events
let events  = [];

//Collection to store the clients
let clients = [];

let restrictedErrMsg = "The isRestricted value of the event can only be true/false.";
let emptyNameErrorMsg = "The event name can't be empty.";
/**
 * Creates a new event with a unique id
 * @param {string} name - the name of the event
 * @param {boolean} isRestricted - if it's restrcited to people younger than 18 y/o
 */
function Event(name, isRestricted) {
    this.id           = events.length;
    this.name         = name;
    this.isRestricted = isRestricted;
}

function Event(name) {
    this.id           = events.length;
    this.name         = name;
    this.isRestricted = false;
}

function Client(name, gender, age) {
    this.name   = name;
    this.gender = gender;
    this.age    = age;
}

function createEvent(name, isRestricted) {
    if (typeof isRestricted !== "boolean") {
        throw new Error(restrictedErrMsg);
    } else if (name == null || name == "") {
        throw new Error(emptyNameErrorMsg);
    }

    events.push(new Event(name, isRestricted));
    console.log("The event \"" + name + "\" was successfully added to the database.");
    return true;
}

function updateEvent(id, name, isRestricted) {
    if (typeof isRestricted !== "boolean") {
        throw new Error(restrictedErrMsg);
    } else if (name == null || name == "") {
        throw new Error(emptyNameErrorMsg);
    }

    let eventIndex = events.findIndex((event => event.id == id));
    events[eventIndex].name = name;
    events[eventIndex].isRestricted = isRestricted;
}

function saveAllEvents(...events) {
    events.push(events)
}

function removeEventById(id) {
    if (id < 0) {
        console.log("The Event ID cannot be negative.");
        return false;
    }

    let event   = events.find(event => event.id == id)
    let eventId = events.indexOf(event);
    events.splice(eventId, 1);
    
    console.log("The event \"" + event.name + "\" has been successfully removed");
    return true;
}

function showEvents() {
    events.forEach(event => {

        process.stdout.write("[" + event.id + "] " + event.name + " : ");

        if (event.isRestricted) {
            console.log("18+")
        } else {
            console.log("All ages")
        }
    });
}




createEvent("1", true);
updateEvent(0, "Paradox", false);
//createEvent("2", false);
//createEvent("3", false);
//createEvent("4", true);
//showEvents();
//removeEventById(2);
showEvents();