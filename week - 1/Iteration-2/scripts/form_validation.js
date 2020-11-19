const eventNameInput            = document.getElementById("input--event-name");
const eventRestrictionSelect    = document.getElementById("select--event-restriction");
const eventPriceInput           = document.getElementById("input--event-price");
const addEventForm              = document.getElementById("form--add-event");

const eventNewNameInput         = document.getElementById("input--new-event-name")
const eventNewRestrictionSelect = document.getElementById("select--new-event-restriction");
const eventNewPriceInput        = document.getElementById("input--new-event-price");
const editEventForm             = document.getElementById("form--add-event");
const editEventFieldset         = document.getElementById("Edit-Event");

const validationMessage         = document.getElementById("validation-message");
const eventLayout               = document.getElementById("layout--events");
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
                        <td style="border-right:none;">${event.isRestricted ? "yes" : "no"}</td>
                        <td style="border-right:none;">${event.price == 0 ? "Free" : event.price}</td>
                        <td style="border-right:none;"><button event-id=${event.id} class="action--edit-event">E</button></td>
                        <td><button event-id=${event.id} class="action--delete-event">X</button></td>
                    </tr>
        `);
    });

    template.push(`</tbody
                </table>`);

    eventLayout.innerHTML = template.join('');

    editEvent();
    removeEvent();
}


addEventForm.addEventListener('submit', function(e) {
    const eventName             = eventNameInput.value;
    const eventRestriction      = eventRestrictionSelect.value === 'true';
    const eventPrice            = eventPriceInput.value;

    const newEvent              = new Event(eventName, eventRestriction, eventPrice);

    addEvent(newEvent);
    validationMessage.innerHTML = validationMessageText;
    displayEvents();
    
    e.preventDefault();

});

editEventForm.addEventListener('submit', function(e) {
    const eventName             = eventNewNameInput.value;
    const eventRestriction      = eventNewRestrictionSelect.value === 'true';
    const eventPrice            = eventNewPriceInput.value;

    let eventId                 = e.target.getAttribute("event-id");

    updateEvent(eventId, eventName, eventRestriction, eventPrice);
    
    validationMessage.innerHTML  = validationMessageText;
    displayEvents();
    
    e.preventDefault();

});

function removeEvent() {
    let deleteBtnsCollection = document.getElementsByClassName("action--delete-event");
    
    for(let i = 0; i < deleteBtnsCollection.length; i++) {
        deleteBtnsCollection[i].addEventListener('click', function(e) {

            let eventId                 = e.target.getAttribute("event-id");
            removeEventById(eventId);
            displayEvents();
            validationMessage.innerHTML = validationMessageText;

            //e.preventDefault();
        });
    }
        
}

function editEvent() {
    let editBtnsCollection = document.getElementsByClassName("action--edit-event");

    for(let i = 0; i < editBtnsCollection.length; i++) {
        editBtnsCollection[i].addEventListener('click', function(e) {

            let eventId                     = e.target.getAttribute("event-id");
            let event                       = getEventById(eventId);

            editEventFieldset.style.display = "block";
            eventNewNameInput.value         = event.name;
            eventNewRestrictionSelect.value = event.isRestricted;
            eventNewPriceInput.value        = event.price;

            
            
        });
    }
        
}

displayEvents();