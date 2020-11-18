const page                   = document.getElementsByTagName("body");
const eventNameInput         = document.getElementById("input--event-name");
const eventRestrictionSelect = document.getElementById("select--event-restriction");
const eventPriceInput        = document.getElementById("input--event-price");
const addEventForm           = document.getElementById("form--add-event");
const validationMessage      = document.getElementById("validation-message");
const eventLayout            = document.getElementById("layout--events");

function displayEvents() {

    template = [`<table cellspacing="0" class="layout_center">
                        <thead>
                            <tr>
                                <td style="border-right:none;">Iwmd</td>
                                <td style="border-right:none;">Name</td>
                                <td style="border-right:none;">Restricted</td>
                                <td style="border-right:none;">Price</td>
                                <td>Action</td> 
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
                        <td><img src="assets/img/icon_delete" class="delete"></td>
                    </tr>
        `);
    });

    template.push(`</tbody
                </table>`);
    eventLayout.innerHTML = template.join('');
}

addEventForm.addEventListener('submit', function(e) {
    const eventName             = eventNameInput.value;
    const eventRestriction      = eventRestrictionSelect.value === 'true';
    const eventPrice            = eventPriceInput.value;

    const newEvent              = new Event(eventName, eventRestriction, eventPrice);

    addEvent(newEvent);
    validationMessage.innerHTML = validationMessageText;
    displayEvents();
    //deleteEvent();

    e.preventDefault();
});

function deleteEvent() {
    let buttons = document.querySelectorAll("#layout--events .delete");

    Array.from(buttons).forEach(function(button) {
        button.addEventListener('click', function(e) {

            const tr = e.target.parentElement;
            tr.parentNode.removeChild(tr);
        });
    });
}