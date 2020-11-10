let events = [];
let eventId = 0;

let clients = [];
/**
 * Creates a new event with a unique id
 * @param {string} name - the name of the event
 * @param {boolean} isRestricted - if it's restrcited to people younger than 18 y/o
 */
function Event(name, isRestricted) {
    let id = 0;
    this.name = name;
    this.isRestricted = isRestricted;
}

function addEvent(name, isRestricted) {
    if (typeof isRestricted !== Boolean) {
        console.log("The isRestricted value of the event can only be true/false.");
        return;
    }
    events.push(new Event(name, isRestricted));
}


events.forEach(element => console.log(element));