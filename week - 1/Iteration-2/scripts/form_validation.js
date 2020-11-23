/**
 * Event
 */
const EventManager = {
    eventNameInput            : document.getElementById("input--event-name"),
    eventRestrictionSelect    : document.getElementById("select--event-restriction"),
    eventPriceInput           : document.getElementById("input--event-price"),
    addEventForm              : document.getElementById("form--add-event"),

    eventNewNameInput         : document.getElementById("input--new-event-name"),
    eventNewRestrictionSelect : document.getElementById("select--new-event-restriction"),
    eventNewPriceInput        : document.getElementById("input--new-event-price"),
    editEventForm             : document.getElementById("form--edit-event"),
    editEventFieldset         : document.getElementById("Edit-Event"),

    validationMessage         : document.getElementById("validation-message1"),
    eventLayout               : document.getElementById("layout--events"),

    editEventId               : 0,

    getEventNameInput() {
        return EventManager.eventNameInput;
    },

    getEventRestrictionSelect() {
        return EventManager.eventRestrictionSelect;
    },

    getEventPriceInput() {
        return EventManager.eventPriceInput;
    },

    getAddEventForm() {
        return EventManager.addEventForm;
    },

    getEventNewNameInput() {
        return EventManager.eventNewNameInput;
    },

    getEventNewRestrictionSelect() {
        return EventManager.eventNewRestrictionSelect;
    },

    getEventNewPriceInput() {
        return EventManager.eventNewPriceInput;
    },

    getEditEventForm() {
        return EventManager.editEventForm;
    },

    getEditEventFieldset() {
        return EventManager.editEventFieldset;
    },

    getValidationMessage() {
        return EventManager.validationMessage;
    },

    setValidationMessage(value) {
        EventManager.validationMessage.innerHTML = value;
    },

    getEventLayout() {
        return EventManager.eventLayout;
    }, 

    getEditEventId() {
        return EventManager.editEventId;
    },

    setEditEventId(value) {
        EventManager.editEventId = value;
    },

    toggleEditEventForm() {
        EventManager.getEditEventFieldset().style.display == "block" 
        ? EventManager.getEditEventFieldset().style.display = "none" 
        : EventManager.getEditEventFieldset().style.display = "block";
    }
    
};

/**
 * Client
 */

const ClientManager = {
    clientNameInput         : document.getElementById("input--client-name"),
    clientGenderSelect      : document.getElementById("select--client-gender"),
    clientAgeInput          : document.getElementById("input--client-age"),
    clientMoneyInput        : document.getElementById("input--client-money"),
    addClientForm           : document.getElementById("form--add-client"),

    clientNewNameInput      : document.getElementById("input--new-client-name"),
    clientNewGenderSelect   : document.getElementById("select--new-client-gender"),
    clientNewAgeInput       : document.getElementById("input--new-client-age"),
    clientNewMoneyInput     : document.getElementById("input--new-client-money"),
    editClientForm          : document.getElementById("form--edit-client"),
    editClientFieldset      : document.getElementById("Edit-Client"),

    validationMessage       : document.getElementById("validation-message2"),
    clientLayout            : document.getElementById("layout--clients"),

    editClientId            : 0,

    getClientNameInput() {
        return ClientManager.clientNameInput;
    },

    getClientGenderSelect() {
        return ClientManager.clientGenderSelect;
    },

    getClientAgeInput() {
        return ClientManager.clientAgeInput;
    },

    getClientMoneyInput() {
        return ClientManager.clientMoneyInput;
    },

    getAddClientForm() {
        return ClientManager.addClientForm;
    },

    getClientNewNameInput() {
        return ClientManager.clientNewNameInput;
    },

    getClientNewGenderSelect() {
        return ClientManager.clientNewGenderSelect;
    },

    getClientNewAgeInput() {
        return ClientManager.clientNewAgeInput;
    },

    getClientNewMoneyInput() {
        return ClientManager.clientNewMoneyInput;
    },

    getEditClientForm() {
        return ClientManager.editClientForm;
    },

    setValidationMessage(value) {
        ClientManager.validationMessage.innerHTML = value;
    },

    getEditClientFieldset() {
        return ClientManager.editClientFieldset;
    },

    getClientLayout() {
        return ClientManager.clientLayout;
    },

    setEditClientId(value) {
        ClientManager.editClientId = value;
    },

    getEditClientId() {
        return ClientManager.editClientId;
    },

    toggleEditClientForm() {
        ClientManager.getEditClientFieldset().style.display == "block" 
        ? ClientManager.getEditClientFieldset().style.display = "none" 
        : ClientManager.getEditClientFieldset().style.display = "block";
    }
};


/**
 * Events
 */
function displayEvents() {

    let template = [`<table cellspacing="0" class="center">
                        <thead>
                            <tr>
                                <td style="border-right:none;">Id</td>
                                <td style="border-right:none;">Name</td>
                                <td style="border-right:none;">Restricted</td>
                                <td style="border-right:none;">Price</td>
                                <td style="border-right:none;">Add Client</td>
                                <td style="border-right:none;">Show Clients</td>
                                <td style="border-right:none;">Edit</td>
                                <td>Delete</td>
                            </tr>
                        </thead>
                        <tbody>
    `];

    getEventCollection().forEach(event => {
        template.push(`
                    <tr>
                        <td style="border-right:none;">${event.id}</td>
                        <td style="border-right:none;">${event.name}</td>
                        <td style="border-right:none;">${event.isRestricted ? "Yes" : "No"}</td>
                        <td style="border-right:none;">${event.price == 0 ? "Free" : event.price}</td>
                        <td style="border-right:none;"><button event-id=${event.id} class="action--add-client-to-event">Add Client</button></td>
                        <td style="border-right:none;"><button event-id=${event.id} class="action--show-clients">Show Clients</button></td>
                        <td style="border-right:none;"><button event-id=${event.id} class="action--edit-event">E</button></td>
                        <td><button event-id=${event.id} class="action--delete-event">X</button></td>
                    </tr>
        `);
    });

    template.push(`</tbody
                </table>`);

    EventManager.getEventLayout().innerHTML = template.join('');

    addClientToEventGUI();
    displayClientsOnEvent();
    editEvent();
    removeEvent();
}


EventManager.addEventForm.addEventListener('submit', function(e) {
    const eventName             = EventManager.getEventNameInput().value;
    const eventRestriction      = EventManager.getEventRestrictionSelect().value === 'true';
    const eventPrice            = EventManager.getEventPriceInput().value;

    const newEvent              = new Event(eventName, eventRestriction, eventPrice);

    addEvent(newEvent);
    EventManager.setValidationMessage(`The event ${eventName} was successfully added to the database.`);
    displayEvents();
    
    e.preventDefault();

});

function removeEvent() {
    let deleteBtnsCollection = document.getElementsByClassName("action--delete-event");
    
    for(let i = 0; i < deleteBtnsCollection.length; i++) {
        deleteBtnsCollection[i].addEventListener('click', function(e) {

            let eventId = e.target.getAttribute("event-id");
            removeEventById(eventId);
            displayEvents();
            EventManager.setValidationMessage(`This event has been successfully removed.`);

        });
    }
        
}

function editEvent() {
    let editBtnsCollection = document.getElementsByClassName("action--edit-event");

    for(let i = 0; i < editBtnsCollection.length; i++) {
        editBtnsCollection[i].addEventListener('click', function(e) {

            let eventId                                       = e.target.getAttribute("event-id");
            EventManager.setEditEventId(eventId);
            let event                                         = getEventById(eventId);

            EventManager.toggleEditEventForm();
            EventManager.getEventNewNameInput().value         = event.name;
            EventManager.getEventNewRestrictionSelect().value = event.isRestricted;
            EventManager.getEventNewPriceInput().value        = event.price;
                
        });
    }
}

EventManager.editEventForm.addEventListener('submit', function(e) {
    const eventId                = EventManager.getEditEventId()
    const eventName              = EventManager.getEventNewNameInput().value;
    const eventRestriction       = EventManager.getEventNewRestrictionSelect().value === 'true';
    const eventPrice             = EventManager.getEventNewPriceInput().value;

    updateEvent(eventId, eventName, eventRestriction, eventPrice);
    
    EventManager.setValidationMessage(`The event ${eventName} has been successfully updated.`);
    EventManager.toggleEditEventForm();
    displayEvents();
    
    e.preventDefault();

});

/**
 * Clients
 */

function displayClients(collection, layout) {

    let template = [`<table cellspacing="0" class="layout_center">
                        <thead>
                            <tr>
                                <td style="border-right:none;">Id</td>
                                <td style="border-right:none;">Name</td>
                                <td style="border-right:none;">Gender</td>
                                <td style="border-right:none;">Age</td>
                                <td style="border-right:none;">Money</td>
                                <td class="td--add-client-to-event" style="border-right:none; display: none;">Add to Event</td>
                                <td style="border-right:none;">Edit</td>
                                <td>Delete</td>
                            </tr>
                        </thead>
                        <tbody>
    `];

    collection.forEach(client => {
        template.push(`
                    <tr>
                        <td style="border-right:none;">${client.id}</td>
                        <td style="border-right:none;">${client.name}</td>
                        <td style="border-right:none;">${client.gender}</td>
                        <td style="border-right:none;">${client.age}</td>
                        <td style="border-right:none;">${client.money}</td>
                        <td style="border-right:none; display: none;"><button client-id=${client.id} class="action--add-to-event">Add to Event</button></td>
                        <td style="border-right:none;"><button client-id=${client.id} class="action--edit-client">E</button></td>
                        <td><button client-id=${client.id} class="action--delete-client">X</button></td>
                    </tr>
        `);
    });

    template.push(`</tbody
                </table>`);

    layout.innerHTML = template.join('');

    editClient();
    removeClient();
}

ClientManager.getAddClientForm().addEventListener('submit', function(e) {
    const clientName   = ClientManager.getClientNameInput().value;
    const clientGender = ClientManager.getClientGenderSelect().value;
    const clientAge    = ClientManager.getClientAgeInput().value;
    const clientMoney  = ClientManager.getClientMoneyInput().value;

    const newClient    = new Client(clientName, clientGender, clientAge, clientMoney);

    addClient(newClient);
    ClientManager.setValidationMessage(`The client ${clientName} has been successfully added to the database.`);
    displayClients(getClientCollection(), ClientManager.getClientLayout());
    
    e.preventDefault();

});

function removeClient() {
    let deleteBtnsCollection = document.getElementsByClassName("action--delete-client");
    
    for(let i = 0; i < deleteBtnsCollection.length; i++) {
        deleteBtnsCollection[i].addEventListener('click', function(e) {

            let clientId = e.target.getAttribute("client-id");
            removeClientById(clientId);
            displayClients(getClientCollection(), ClientManager.getClientLayout());
            ClientManager.setValidationMessage(`This client has been successfully removed.`);
        });
    }
        
}

function editClient() {
    let editBtnsCollection = document.getElementsByClassName("action--edit-client");

    for(let i = 0; i < editBtnsCollection.length; i++) {
        editBtnsCollection[i].addEventListener('click', function(e) {

            let clientId                                      = e.target.getAttribute("client-id");
            ClientManager.setEditClientId(clientId);
            let client                                         = getClientById(clientId);

            ClientManager.toggleEditClientForm();
            ClientManager.getClientNewNameInput().value    = client.name;
            ClientManager.getClientNewGenderSelect().value = client.gender;
            ClientManager.getClientNewAgeInput().value     = client.age;
            ClientManager.getClientNewMoneyInput().value   = client.money;
            
        });
    }
}

ClientManager.editClientForm.addEventListener('submit', function(e) {
    const clientId     = ClientManager.getEditClientId();
    const clientName   = ClientManager.getClientNewNameInput().value;
    const clientGender = ClientManager.getClientNewGenderSelect().value;
    const clientAge    = ClientManager.getClientNewAgeInput().value;
    const clientMoney  = ClientManager.getClientNewMoneyInput().value;

    updateClient(clientId, clientName, clientGender, clientAge, clientMoney);
    
    ClientManager.toggleEditClientForm();
    ClientManager.setValidationMessage(`The client ${clientName} has been successfully updated.`);
    displayClients(getClientCollection(), ClientManager.getClientLayout());
    
    e.preventDefault();

});

function addClientToEventGUI() {
    let addClientToeventBts = document.getElementsByClassName("action--add-client-to-event");

    for(let i = 0; i < addClientToeventBts.length; i++) {
        addClientToeventBts[i].addEventListener('click', function(e1) {

            let eventId = e1.target.getAttribute("event-id");
            const event = getEventById(eventId);

            let tdTitle = document.getElementsByClassName("td--add-client-to-event");
            tdTitle[0].style.display = "block";
            let addClientBts = document.getElementsByClassName("action--add-to-event");

            for (let j = 0; j < addClientBts.length; j++) {
                addClientBts[j].parentElement.style.display = "block";
                
                addClientBts[j].addEventListener('click', function(e2) {
                    let clientId = e2.target.getAttribute("client-id");
                    const client = getClientById(clientId);
                    addClientToEvent(client, event);

                    EventManager.setValidationMessage(`The client ${client.name} has been successfully added to the event ${event.name}`);
                });
            }
        });
    }
}

function displayClientsOnEvent () {
    let showClientsBts = document.getElementsByClassName("action--show-clients");

    for(let i = 0; i < showClientsBts.length; i++) {
        showClientsBts[i].addEventListener('click', function(e) {
            let eventId = e.target.getAttribute("event-id");
            const event = getEventCollection().find(event => event.id == eventId);

            displayClients(event.eventClients, document.getElementById("layout--clients-on-event"));
        });
    }

}

displayEvents();
displayClients(getClientCollection(), ClientManager.getClientLayout());