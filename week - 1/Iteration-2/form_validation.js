const eventName        = document.getElementById("event-name").value;
const eventRestriction = document.getElementById("event-restriction").value;
const eventPrice       = document.getElementById("event-price").value;

let errorMSg = undefined;

function addEventForm() {
    newEvent = new Event(eventName, eventRestriction, eventPrice);
    addEvent(newEvent);
    document.getElementById("validation-message").innerHTML = errorMSg;
}