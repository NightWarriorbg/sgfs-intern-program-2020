const eventNameInput         = document.getElementById("input--event-name");
const eventRestrictionSelect = document.getElementById("select--event-restriction");
const eventPriceInput        = document.getElementById("input--event-price");
const addEventForm           = document.getElementById("form--add-event");
const validationMessage      = document.getElementById("validation-message");
const eventLayout            = document.getElementById("layout--events");

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
                        <td style="border-right:none;"><a href="#0" item-id=${event.id} class="action--edit-event">E</a></td>
                        <td><a href="#0" item-id=${event.id} class="action--delete-event">X</a></td>
                    </tr>
        `);
    });

    template.push(`</tbody
                </table>`);
    eventLayout.innerHTML = template.join('');
}

function removeEvent() {
    let deleteBtns = document.getElementsByClassName("action--delete-event");

    for(let i = 0; i < deleteBtns.length; i++) {

        const button = deleteBtns[i];
        
        button.addEventListener('click', function(e) {

            let currentEvent = e.target;
            let eventId = currentEvent.getAttribute("item-id");
            let td = currentEvent.parentElement;
            td.parentNode.removeChild(tr);
            removeEventById(eventId);

            e.preventDefault();
        });
    }
        
}

removeEvent();