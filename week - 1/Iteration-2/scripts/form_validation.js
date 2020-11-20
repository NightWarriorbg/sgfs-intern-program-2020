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

    validationMessage       : document.getElementById("validation-message2"),
    clientLayout            : document.getElementById("layout--clients"),

    getClientNameInput() {
        return ClientManager.clientNameInput;
    },

    getclientGenderSelect() {
        return ClientManager.clientGender;
    },

    getClientAgeInput() {
        return ClientManager.clientAge;
    },

    getClientMoneyInput() {
        return ClientManager.clientMoneyInput;
    },

    getAddClientForm() {
        return ClientManager.addClientForm;
    }
};

let editEventId;

function getEditEventId() {
    return editEventId;
}

function setEditEventId(value) {
    editEventId = value;
}


/**
 * Events
 */

function toggleEditEventForm() {
    EventManager.getEditEventFieldset().style.display == "block" 
    ? EventManager.getEditEventFieldset().style.display = "none" 
    : EventManager.getEditEventFieldset().style.display = "block";
}

function displayEvents() {

    template = [`<table cellspacing="0" class="layout_center">
                        <thead>
                            <tr>
                                <td style="border-right:none;">Id</td>
                                <td style="border-right:none;">Name</td>
                                <td style="border-right:none;">Restricted</td>
                                <td style="border-right:none;">Price</td>
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
                        <td style="border-right:none;"><button event-id=${event.id} class="action--edit-event">E</button></td>
                        <td><button event-id=${event.id} class="action--delete-event">X</button></td>
                    </tr>
        `);
    });

    template.push(`</tbody
                </table>`);

    EventManager.getEventLayout().innerHTML = template.join('');

    editEvent();
    removeEvent();
}


EventManager.addEventForm.addEventListener('submit', function(e) {
    const eventName             = EventManager.getEventNameInput().value;
    const eventRestriction      = EventManager.getEventRestrictionSelect().value === 'true';
    const eventPrice            = EventManager.getEventPriceInput().value;

    const newEvent              = new Event(eventName, eventRestriction, eventPrice);

    addEvent(newEvent);
    EventManager.setValidationMessage(validationMessageText);
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
            EventManager.setValidationMessage(validationMessageText);

        });
    }
        
}

function editEvent() {
    let editBtnsCollection = document.getElementsByClassName("action--edit-event");

    for(let i = 0; i < editBtnsCollection.length; i++) {
        editBtnsCollection[i].addEventListener('click', function(e) {

            let eventId                     = e.target.getAttribute("event-id");
            editEventId = eventId;
            let event                       = getEventById(eventId);

            toggleEditEventForm();
            EventManager.getEventNewNameInput().value         = event.name;
            EventManager.getEventNewRestrictionSelect().value = event.isRestricted;
            EventManager.getEventNewPriceInput().value        = event.price;
                
        });
    }
        
}

EventManager.editEventForm.addEventListener('submit', function(e) {
    const eventName              = EventManager.getEventNewNameInput().value;
    const eventRestriction       = EventManager.getEventNewRestrictionSelect().value === 'true';
    const eventPrice             = EventManager.getEventNewPriceInput().value;

    updateEvent(editEventId, eventName, eventRestriction, eventPrice);
    
    EventManager.setValidationMessage(validationMessageText);
    toggleEditEventForm();
    displayEvents();
    
    e.preventDefault();

});

/**
 * Clients
 */

ClientManager.getAddClientForm().addEventListener('submit', function(e) {
    const clientName   = ClientManager.getClientNameInput().value;
    const clientGender = ClientManager.getclientGenderSelect().value;
    const clientAge    = ClientManager.getClientAgeInput().value;
    const clientMoney  = ClientManager.getClientMoneyInput().value;

    const newClient    = new Client(clientName, clientGender, clientAge, clientMoney);

    addClient(newClient);
    ClientManager.setValidationMessage(validationMessageText);
    //displayEvents();
    
    e.preventDefault();

});


//displayClients();
displayEvents();