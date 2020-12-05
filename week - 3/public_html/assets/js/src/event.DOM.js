/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const EventDomManager = {
    layoutShowEvents : $('.layout--show-events'),
    formAddEvent     : $('#form--add-event'),
    inputEventName   : document.getElementById('input--event-name'),
    inputEventTime   : document.getElementById('input--event-time'),
    selectedDay      : $('.event-area h2'),
    
    getLayoutShowEvents() {
        return EventDomManager.layoutShowEvents;
    },
    
    getFormAddEvent() {
        return EventDomManager.formAddEvent;
    },
    
    getInputEventName() {
        return EventDomManager.inputEventName;
    },
    
    getInputEventTime() {
        return EventDomManager.inputEventTime;
    },
    
    getSelectedDay() {
        return EventDomManager.selectedDay;
    },
    
};

function getEventDue(event) {
    const date    = event.due;
    
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours   = date.getHours();
    
    return `${hours}:${minutes}:${seconds}`;
}



function renderEvents() {
               
    let template = ['<ul>'];
        
    EventManager.getEventCollection().forEach(event => {
        const date = CalendarManager.getEventDateObj();
        const isDate =  date.getFullYear() == event.due.getFullYear() && 
                        date.getMonth() == event.due.getMonth() && 
                        date.getDate() == event.due.getDate();
        if (isDate) {
            template.push(`<li><span class="event-time">${getEventDue(event)}</span> - ${event.name} <a class="remove-event" href="#" event-id="${event.id}">X</a></li>`);
        } 
    });

    template.push('</ul>');
    EventDomManager.getLayoutShowEvents().html(template.join(''));
    
    removeEvent();
}

EventDomManager.getFormAddEvent().on('submit', (e) => {
    const eventName = EventDomManager.getInputEventName().value;
    const eventTime = EventDomManager.getInputEventTime().value;
        
    const hours     = eventTime.substring(0, 2);
    const minutes   = eventTime.substring(3, 5);
    const seconds   = eventTime.substring(6, 8);

    const date      = CalendarManager.getEventDateObj();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    addEvent(new Event(eventName, date));
    renderEvents();

    e.preventDefault();
});

function removeEvent() {
    
    const removeEventBtns = $('.remove-event');
    removeEventBtns.on('click', (e) => {
        let eventId = e.target.getAttribute('event-id');
        removeEventById(eventId);
        renderEvents();
    });
}
    
renderEvents();