/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const EventDomManager = {
    layoutShowEvents : $('.layout--show-events'),
    formAddEvent     : $('#form--add-event'),
    inputEventName   : $('#input--event-name'),
    
    getLayoutShowEvents() {
        return EventDomManager.layoutShowEvents;
    },
    
    getFormAddEvent() {
        return EventDomManager.formAddEvent;
    },
    
    getInputEventName() {
        return EventDomManager.inputEventName;
    }
};

function renderEvents() {
    let template = ['<ul>'];
    
    EventManager.getEventCollection().forEach(event => {
        template.push(`<li>${event.name}</li>`);
    });
    
    template.push('</ul>');
    EventDomManager.getLayoutShowEvents().html(template.join(''));
}

EventDomManager.getFormAddEvent().on('submit', (e) => {
    const eventName = EventDomManager.getInputEventName().attribute('value');
    const date      = new Date();
    
    addEvent(new Event(eventName, date));
    renderEvents();
    
    e.preventDefault();
});

renderEvents();