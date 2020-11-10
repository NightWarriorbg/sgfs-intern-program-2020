//Collection to store the events
let events  = [];

//Collection to store the clients
let clients = [];
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

function addEvent(name, isRestricted) {
    if (typeof isRestricted !== "boolean") {
        console.log("The isRestricted value of the event can only be true/false.");
        return;
    } else if (name == null) {
        console.log("The event name can't be empty.");
        return;
    }
    events.push(new Event(name, isRestricted));
    console.log("The event \"" + name + "\" was successfully added to the database.");
}

function removeEventById(id) {
    if (id < 0) {
        console.log("The Event ID cannot be negative.");
        return;
    }
    let event  = events.find(event => event.id == id)
    let eventId = events.indexOf(event);
    events.splice(eventId, 1);
    
    console.log("The event \"" + event.name + "\" has been successfully removed");
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




addEvent("1", true);
addEvent("2", false);
addEvent("3", false);
addEvent("4", true);
showEvents();
removeEventById(2);
showEvents();