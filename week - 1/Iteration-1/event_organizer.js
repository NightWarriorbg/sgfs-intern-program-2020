//Collection to store the events
let events  = [];

//Collection to store the clients
let clients = [];
let eventIdIcrement = 0;

let canAddClients   = true;
let canAddEvents    = true;

//Error messages
const RESTRICTED_EVENT_ERROR_MESSAGE = "The isRestricted value of the event can only be true/false.";
const EMPTY_NAME_ERROR_MESSAGE = "The name can't be empty.";
const INVALID_GENDER_ERROR_MESSAGE = "Please choose a valid gender(male/female).";
const INVALID_AGE_ERROR_MESSAGE = "The age can't be a negative number";

/**
 * Shows the current Date in this data format
 */
function getCurrentDate() {
    return new Date();
}

/**
 * Constructs a new event with a unique id
 * @param {string} name - the name of the event
 * @param {boolean} isRestricted - if it's restrcited to people younger than 18 y/o
 * @param {number} price - the price of the event
 */
function Event(name, isRestricted, price) {
    this.id               = eventIdIcrement;
    this.name             = name;
    if (arguments.length < 3) {
        this.isRestricted = false;
        this.price        = 0;
    } else {
        this.isRestricted = isRestricted;
        this.price        = price;
    }
    this.eventClients = [];
    this.dateAdded        = getCurrentDate();
    this.dateUpdated      = this.dateAdded;
    eventIdIcrement++;
}


/**
 * Constructs a new client
 * @param {string} name - the name of the client
 * @param {string} gender - the gender of the client
 * @param {number} age - the age of the client
 * @param {number} money - the money that the client has
 */
function Client(name, gender, age, money) {
    this.name        = name;
    this.gender      = gender;
    this.age         = age;
    this.money       = money;
    this.isVIP       = false;
    this.eventsCount = 0;
}

/**
 * Turns om/off event or client registering 
 * @param {string} systemFunction 
 */
function toggleSystemFunction(systemFunction) {
    if (systemFunction == "events") {
        canAddEvents  = !canAddEvents;
        console.log("The adding permission of new events has been changed.");
    } else if (systemFunction == "clients") {
        canAddClients = !canAddClients;
        console.log("The adding permission of new clients has been changed.");
    } else {
        throw Error("Unrecognized function.")
    }
}

/**
 * 
 * Event Functions
 * 
 */

/**
 * Adds a new event to the database
 * @param {Event} event - the event to be added
 */
function addEvent(event) {
    if (event.name == null || event.name == "") {
        throw new Error(EMPTY_NAME_ERROR_MESSAGE);
    } else if(!canAddEvents) {
        console.log("The adding of new events has been stopped by the system. To turn it on please run the toggleSystemFunction.");
        return false;
    } else if (event.price > 0) {
        event.name = "$" + event.name;
    } else if (event.price == 0) {
        event.name = "!" + event.name;
    }

    events.push(event);
    console.log("The event \"" + event.name + "\" was successfully added to the database.");
    return true;
}

/**
 * Updates an already existing event with a given id
 * @param {number} id - id of the event to be updated
 * @param {string} name - new name of the event
 * @param {boolean} isRestricted - is the event going to be restricted or not
 */
function updateEvent(id, name, isRestricted, price) {
    if (typeof isRestricted !== "boolean") {
        throw new Error(RESTRICTED_EVENT_ERROR_MESSAGE);
    } else if (name == null || name == "") {
        throw new Error(EMPTY_NAME_ERROR_MESSAGE);
    } else if(price < 0) {
        throw new Error("The price cannot be negative");
    }


    let eventIndex                  = events.findIndex((event => event.id == id));

    console.log("The event \"" + events[eventIndex].name + "\" has been successfully updated.");

    events[eventIndex].name         = name;
    events[eventIndex].isRestricted = isRestricted;
    events[eventIndex].price        = price;
    events[eventIndex].dateUpdated  = getCurrentDate();
    return true;
}

/**
 * Adds multiple events to the database
 * @param  {...Event} allEvents 
 */
function addAllEvents(...allEvents) {
    if (!canAddEvents) {
        console.log("The adding of new events has been stopped by the system. To turn it on please run the toggleSystemFunction.");
        return false;
    }

    allEvents.forEach(event => {
        addEvent(event);
    });
    return true;
}

/**
 * Removes an event with a given id from the Database
 * @param {number} id 
 */
function removeEventById(id) {
    if (id < 0) {
        throw new Error("The Event ID cannot be negative.");
    }

    let event   = events.find(event => event.id == id)
    let eventId = events.indexOf(event);
    events.splice(eventId, 1);
    
    console.log("The event \"" + event.name + "\" has been successfully removed");
    return true;
}

/**
 * Shows all events in the database
 */
function showEvents() {
    if (events.length <= 0) {
        console.log("There are currently no events added.");
        return false;
    }
    events.forEach(event => {
        process.stdout.write("[" + event.id + "] " + event.name + " : ");
        event.isRestricted ? process.stdout.write("18+") : process.stdout.write("All ages");
        console.log(" | Price=" + event.price);
    });
    return true;
}

/**
 * Gets all event/s with the biggest number of clients
 */
function getEventWithTheMostClients() {
    let maxClients = 0; 

    events.forEach(event => {
        if (event.eventClients.length > maxClients) {
            maxClients = event.eventClients.length;
        }
    });

    if (maxClients == 0) {
        console.log("All the currently added events, have no clients.");
        return false;
    }

    const allEventsWithMaxClients = events.filter(event => event.eventClients.length == maxClients);

    process.stdout.write("All events with the same number of maximum clients: ");

    allEventsWithMaxClients.forEach(event => {
        process.stdout.write(event.name +" ");
    });
    console.log("\n");
}

/**
 * Shows all events in the database for underaged clients
 */
function showAllEventsForUnderaged() {
    const allEventsForUnderaged = events.filter(event => !event.isRestricted);

    if (allEventsForUnderaged.length <= 0) {
        console.log("There are no events for underaged clients")
        return false;
    }

    process.stdout.write("All events suitable for underaged clients: ")
    allEventsForUnderaged.forEach(event => {
        process.stdout.write(event.name + " ");
    });
    console.log("\n");
    return true;
}

/**
 * Shows all events in the database and sorts them by 
 * whether they are resticted for underaged clients or not.
 */
function showAllEventsAndGroupByIsRestricted() {
    if (events.length <= 0) {
        console.log("There are currently no events added");
        return false;
    }

    const sortedEventsByRestriction = Array.from(events);

    sortedEventsByRestriction.sort( (x, y) => x.isRestricted - y.isRestricted);

    console.log("All events grouped by restriction: ");

    sortedEventsByRestriction.forEach(event => {
        if (event.isRestricted) {
            console.log("* " + event.name);
        } else {
            console.log("# " + event.name);
        }
    });

    console.log("\n");
    return true;
}

/**
 * Shows events by a given criteria
 * @param {string} flag
 */
function showAllEventsByCriteria(flag) {
    let criteria  = undefined;

    if (flag.localeCompare("underaged") == 0) {
        criteria  = events.filter(event => !event.isRestricted);
    } else if (flag.localeCompare("18+") == 0) {
        criteria  = events.filter(event => event.isRestricted);
    } else if (flag.includes("name=")) {
        let split = flag.split("=");
        criteria  = events.filter(event => event.name.includes(split[1]));
    } else if (flag.localeCompare("free") == 0) {
        criteria  = events.filter(event => event.price == 0);
    } else if (flag.localeCompare("paid") == 0) {
        criteria  = events.filter(event => event.price > 0);
    } else {
        console.log("Unrecofnized command!");
        return false;
    }

    if (criteria.length <= 0) {
        console.log("There are no events that meet this criteria.");
        return false;
    }

    criteria.forEach(event => {
        process.stdout.write("[" + event.id + "] " + event.name + " : ");
        event.isRestricted ? console.log("18+") : console.log("All ages");
    });
    
    return true;
}

/**
 * 
 * Client Functions
 * 
 */

 /**
  * Adds a client to the clients database
  * @param {Client} client
  */
function addClient(client) {
    if (client.name == null || client.name == "") {
        throw new Error(EMPTY_NAME_ERROR_MESSAGE)
    } else if(client.gender.localeCompare("male") != 0 && client.gender.localeCompare("female")) {
        throw new Error(INVALID_GENDER_ERROR_MESSAGE);
    } else if(client.age < 0) {
        throw new Error(INVALID_AGE_ERROR_MESSAGE);
    } else if (!canAddClients) {
        console.log("The addition of new clients has been stopped by the system. To turn it on please run the toggleSystemFunction.");
        return false;
    }
    clients.push(client);
    console.log("The client \"" + client.name + "\" was successfully added to the database.");
    return true;
}

/**
 * Adds multiple clients at once at the database
 * @param  {...Client} allClients 
 */
function addAllClients(...allClients) {
    if (!canAddClients) {
        console.log("The clients of new events has been stopped by the system. To turn it on please run the toggleSystemFunction.");
        return false;
    }
    allClients.forEach(client => {
        addClient(client);
    });
    return true;
}

/**
 * Adds a client to an excisting event
 * @param {Client} client - client to be added
 * @param {Event} event - event the client to be added to
 */
function addClientToEvent(client, event) {
    if (client.age < 18 && event.isRestricted) {
        console.log("This event is for clients over 18 y/o. ");
        return false;
    } else if(!events.includes(event)) {
        console.log("This event hasn't been added to the database yet.");
        return false;
    } else if (!canAddClients) {
        console.log("The addition of new clients to events has been stopped globally by the system.");
        return false;
    } else if(client.money - event.price < 0) {
        console.log("The client " + client.name + " doesn't have enough money for this event");
        return false;
    } else if (client.eventsCount == 5) {
        client.isVIP = true;
        console.log("The client " + client.name + " is now VIP.");
    } else if (client.isVIP && client.eventsCount == 6) {
        event.eventClients.push(client);
        client.eventsCount = 0;
        client.isVIP = false;;
        console.log("The client" + client.name + " has visited the 6th event free of charge and is no longer VIP");
        return true;
    }

    event.eventClients.push(client);
    client.money -= event.price;
    client.eventsCount++;
    return true;
}

/**
 * Removes a client from an existing event
 * @param {Client} client - client to be removed
 * @param {Event} event - event the client to be remoced from
 */
function removeClientFromEvent(client, event) {
    if (!event.eventClients.includes(client)) {
        console.log("This client doesn't exist in this event.");
        return false;
    }
    let clientId = event.eventClients.indexOf(client);
    event.eventClients.splice(clientId, 1);
    
    console.log("The client \"" + client.name + "\" has been successfully removed from event \"" + event.name + "\".");
    return true;
}

/**
 * Shows all clients in a given event
 * @param {Event} event 
 * @param {string} filterByGender 
 */
function showAllClientsOnEvent(event, filterByGender) {
    if (event.eventClients.length <= 0) {
        console.log("There are no clients for this event.");
        return false;
        
    } else if (arguments.length == 2) {

        if(filterByGender.localeCompare("male") != 0 && filterByGender.localeCompare("female") != 0) {
            throw new Error(INVALID_GENDER_ERROR_MESSAGE);
        }
        let filterClients = event.eventClients.filter(client => client.gender.localeCompare(filterByGender) == 0);
        console.log("Clients of event \"" + event.name + "\":");
        filterClients.forEach(client => {
            console.log("Name: " + client.name + " | Gender: " + client.gender + " | Age: " + client.age);
        });
        return true;
    }

    console.log("Clients of event \"" + event.name + "\":");
    event.eventClients.forEach(client => {
        console.log("Name: " + client.name + " | Gender: " + client.gender + " | Age: " + client.age);
    });

    return true;
}

/**
 * 
 * Testing
 * 
 */

client1 = new Client("Georgi Petrov", "male", 20, 1000);
client2 = new Client("Georgi Ivanov", "male", 17, 1000);
client3 = new Client("Kayta Nedqlkova", "female", 26, 1000);
client4 = new Client("Maria Mladenova", "female", 18, 1000);
client5 = new Client("Goshko", "male", 19, 1000);

event1 = new Event("Event 1", true, 5);
event2 = new Event("Event 2", false, 5);
event3 = new Event("Event 3");
event4 = new Event("Event 4", true, 5);
event5 = new Event("Event 5", true, 10);
event6 = new Event("Event 6");
event7 = new Event("Event 7", false, 10);
event8 = new Event("Event 8");
event9 = new Event("Event 9", false, 1);

// Adding events and clients and showing events
function Testing1() {
    
    addAllEvents(event1, event2, event3, event4, event5, event6, event7, event8);
    console.log("\n");
    addAllClients(client1, client2, client3, client4);
    console.log("\n");
    showEvents();
    console.log("\n");

}

// Updating and deleting events
function Testing2() {
    updateEvent(0, "Event 1 Updated", false, 10);
    console.log("\n");
    showEvents();
    console.log("\n");
    removeEventById(1);
    console.log("\n");
    showEvents();
    console.log("\n");
}

//Adding clients to events and showing clients on events
function Testing3() {
    addClientToEvent(client1, event1);
    addClientToEvent(client1, event2);
    addClientToEvent(client1, event3);
    addClientToEvent(client1, event4);
    addClientToEvent(client1, event5);
    addClientToEvent(client1, event6);
    addClientToEvent(client2, event1);
    addClientToEvent(client3, event1);
    addClientToEvent(client4, event1);
    addClientToEvent(client3, event2);
    addClientToEvent(client4, event3);
    console.log("\n");
    showAllClientsOnEvent(event1, "male")
    console.log("\n");
    removeClientFromEvent(client1, event1);
    console.log("\n");
    showAllClientsOnEvent(event1, "male");
}

//System Toggle for events and clients
function Testing4() {
    toggleSystemFunction("events");
    console.log("\n");
    toggleSystemFunction("clients");
    console.log("\n");
    addEvent(event9);
    console.log("\n");
    addClient(client5);
    console.log("\n");
    addClientToEvent(client5, event9);
    console.log("\n");
}

function Testing5() {
    addClientToEvent(client1, event1);
    addClientToEvent(client1, event2);
    addClientToEvent(client1, event3);
    addClientToEvent(client1, event4);
    addClientToEvent(client1, event5);
    addClientToEvent(client1, event6);
    addClientToEvent(client2, event1);
    addClientToEvent(client3, event1);
    addClientToEvent(client4, event1);
    addClientToEvent(client3, event2);
    addClientToEvent(client4, event3);
    getEventWithTheMostClients();
}

function Testing6() {
    showAllEventsAndGroupByIsRestricted();
}

function Testing7() {
    showAllEventsByCriteria("underaged");
    console.log("\n");
    showAllEventsByCriteria("18+");
    console.log("\n");
    showAllEventsByCriteria("name=Event 1");
    console.log("\n");
    showAllEventsByCriteria("paid");
    console.log("\n");
    showAllEventsByCriteria("free");
    console.log("\n");
}

function Testing8() {
    pesho = new Client("Pesho Ivanov", "male", 19, 10);
    gosho = new Client("Goshko Penev", "male", 22, 1000);
    concert = new Event("Concert", true, 15);
    addEvent(concert);
    addClient(pesho);
    addClient(gosho);
    addClientToEvent(pesho, concert);
    addClientToEvent(gosho, event1);
    addClientToEvent(gosho, event2);
    addClientToEvent(gosho, event3);
    addClientToEvent(gosho, event4);
    addClientToEvent(gosho, event5);
    addClientToEvent(gosho, event6);
    addClientToEvent(gosho, event7);
}

Testing1(); // Always needed for correct testing
//Testing2();
//Testing3();
//Testing4();
//Testing5();
//Testing6();
//Testing7();
//Testing8();