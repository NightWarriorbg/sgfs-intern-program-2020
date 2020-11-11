//Collection to store the events
let events  = [];

//Collection to store the clients
let clients = [];
let eventIdIcrement = 0;
let clientIdIcrement = 0;

let canAddClients = true;
let canAddEvents = true;

//Error messages
const RESTRICTED_EVENT_ERROR_MESSAGE = "The isRestricted value of the event can only be true/false.";
const EMPTY_NAME_ERROR_MESSAGE = "The name can't be empty.";
const INVALID_GENDER_ERROR_MESSAGE = "Please choose a valid gender(male/female).";
const INVALID_AGE_ERROR_MESSAGE = "The age can't be a negative number";

/**
 * Creates a new event with a unique id
 * @param {string} name - the name of the event
 * @param {boolean} isRestricted - if it's restrcited to people younger than 18 y/o
 */
function Event(name, isRestricted) {
    this.id           = eventIdIcrement;
    this.name         = name;
    this.isRestricted = isRestricted;
    this.eventClients = [];
    eventIdIcrement++;
}

function Event(name) {
    this.id           = eventIdIcrement;
    this.name         = name;
    this.isRestricted = false;
    this.eventClients = [];
    eventIdIcrement++;
}

function Client(name, gender, age) {
    this.name   = name;
    this.gender = gender;
    this.age    = age;
}

function toggleSystemFunction(systemFunction) {
    if (systemFunction == "events") {
        canAddEvents = !canAddEvents;
    } else if (systemFunction == "clients") {
        canAddClients = !canAddEvents;
    } else {
        throw Error("Unrecognized function.")
    }
}

/**
 * 
 * Event Functions
 * 
 */

function addEvent(event) {
    if (typeof event.isRestricted !== "boolean") {
        throw new Error(RESTRICTED_EVENT_ERROR_MESSAGE);
    } else if (event.name == null || event.name == "") {
        throw new Error(EMPTY_NAME_ERROR_MESSAGE);
    }

    events.push(event);
    console.log("The event \"" + event.name + "\" was successfully added to the database.");
    return true;
}

function updateEvent(id, name, isRestricted) {
    if (typeof isRestricted !== "boolean") {
        throw new Error(RESTRICTED_EVENT_ERROR_MESSAGE);
    } else if (name == null || name == "") {
        throw new Error(EMPTY_NAME_ERROR_MESSAGE);
    }

    let eventIndex = events.findIndex((event => event.id == id));
    events[eventIndex].name = name;
    events[eventIndex].isRestricted = isRestricted;
}

function addAllEvents(...allEvents) {
    allEvents.forEach(event => {
        addEvent(event);
    });
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

/**
 * 
 * Client Functions
 * 
 */

function addClient(client) {
    if (client.name == null || client.name == "") {
        throw new Error(EMPTY_NAME_ERROR_MESSAGE)
    } else if(!(client.gender.localeCompare("male") != 0 || client.gender.localeCompare("female"))) {
        throw new Error(INVALID_GENDER_ERROR_MESSAGE);

    } else if(client.age < 0) {
        throw new Error(INVALID_AGE_ERROR_MESSAGE);
    }
    clients.push(client);
    console.log("The client \"" + client.name + "\" was successfully added to the database.");
    return true;
}

function addAllClients(...allClients) {
    allClients.forEach(client => {
        addClient(client);
    });
}

function addClientToEvent(client, event) {
    if (client.age < 18 && event.isRestricted) {
        console.log("This event is for clients over 18 y/o. ");
        return false;
    }

    event.eventClients.push(client);
    return true;
}

function removeClientFromEvent(client, event) {
    let clientId = events.evenClients.indexOf(client);
    event.evenClients.splice(clientId, 1);
    
    console.log("The client \"" + client.name + "\" has been successfully removed from event \"" + event.name + "\".");
    return true;
}

function showAllClientsOnEvent(event, filterByGender = null) {
    if (filterByGender != null) {
        if(!(filterByGender.localeCompare("male") != 0 || filterByGender.localeCompare("female") != 0)) {
            throw new Error(INVALID_GENDER_ERROR_MESSAGE);
        } 
    } else if (filterByGender == null) {
        event.eventClients.forEach(client => {
            if (client.gender.localeCompare(filterByGender)) {
                console.log("Name: " + client.name + " | Gender: " + client.gender + " | Age: " + client.age);
            }
        });
        return;
    }
    event.eventClients.forEach(client => {
        console.log("Name: " + client.name + " | Gender: " + client.gender + " | Age: " + client.age);
    });
}

client1 = new Client("Georgi Petrov", "male", 20);
client2 = new Client("Ivan Ivanov", "female", 17);
client3 = new Client("Kayta Nedqlkova", "male", 26);
client4 = new Client("Maria Mladenova", "male", 15);

event1 = new Event("Pop folk fest", true);
event2 = new Event("Kid Party");

addAllEvents(event1, event2);
showEvents();

addAllClients(client1, client2, client3, client4);
addClientToEvent(client1, event1);
addClientToEvent(client2, event1);
addClientToEvent(client3, event1);
addClientToEvent(client4, event1);
showAllClientsOnEvent(event1);