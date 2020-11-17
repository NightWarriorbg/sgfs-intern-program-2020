const eventNameInput         = document.getElementById("input--event-name");
const eventRestrictionSelect = document.getElementById("select--event-restriction");
const eventPriceInput        = document.getElementById("input--event-price");
const addEventForm           = document.getElementById("form--add-event");
const validationMessage      = document.getElementById("validation-message");

addEventForm.addEventListener('submit', function(e) {
    const eventName             = eventNameInput.value;
    const eventRestriction      = eventRestrictionSelect.value === 'true';
    const eventPrice            = eventPriceInput.value;

    const newEvent              = new Event(eventName, eventRestriction, eventPrice);

    addEvent(newEvent);
    validationMessage.innerHTML = validationMessageText;

    e.preventDefault();
});

function displayEvents() {

    let template = ['<table><tbody>'];
    getEventCollection().forEach(event => {

    });
}

function addEvsentAction() {
    newEvent = new Event(eventName, eventRestriction, eventPrice);
    addEvent(newEvent);
    document.getElementById("validation-message").innerHTML = validationMessage;
    console.log(newEvent);
    return true;
}
