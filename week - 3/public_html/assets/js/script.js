const CalendarManager = {
    monthTitleLayout     : $('.month h3'),
    currentTimeLayout    : $('.date .current-time'),
    currentDateLayout    : $('.date .current-date'),
    
    monthsCollection     : [
                            "January", "February", "March", "April", "May", "June", "July", 
                            "August", "September", "October", "November", "December"
    ],

    getMonthsCollection() {
        return CalendarManager.monthsCollection;
    },
    
    getMonthTitleLayout() {
        return CalendarManager.monthTitleLayout;
    },
    
    getCurrentTimeLayout() {
        return CalendarManager.currentTimeLayout;
    },
    
    getCurrentDateLayout() {
        return CalendarManager.currentDateLayout;
    }
};

const DateManager = {
    date : new Date(),
    
    getDateObject() {
        return DateManager.date;
    },
    
    updateDateObject(value) {
        DateManager.date = value;
    },
    
    getTextOfMonth() {
        return CalendarManager.getMonthsCollection()[DateManager.getDateObject().getMonth()];
    },
    
    getSeconds() {
        return DateManager.getDateObject().getSeconds();
    },
    
    getMinutes() {
        return DateManager.getDateObject().getMinutes();
    },
    
    getHours() {
        return DateManager.getDateObject().getHours();
    },
    
    getDay() {
        return DateManager.getDateObject().getDay();
    },
    
    getYear() {
        return DateManager.getDateObject().getFullYear();
    },
    
    setCurrentTimeFormat(secs, mins, hours) {
        return `${hours}:${mins}:${secs}`;
    },
    
    addZeroPrefix(time) {
        if (time < 10) {
            return `0${time}`;
        }
        
        return time;
    },
    
    displayCurrentTime() {
        DateManager.updateDateObject(new Date());
        let currentDate = DateManager.getDateObject();
        
        let secs  = DateManager.addZeroPrefix(currentDate.getSeconds());
        let mins  = DateManager.addZeroPrefix(currentDate.getMinutes());
        let hours = DateManager.addZeroPrefix(currentDate.getHours());
        
        CalendarManager.getCurrentTimeLayout().html(DateManager.setCurrentTimeFormat(secs, mins, hours));
        setTimeout(() => { DateManager.displayCurrentTime(); }, 1000);
    },
    
    displayCurrentDate() {
        const day    = DateManager.getDay();
        const month  = DateManager.getTextOfMonth();
        const year   = DateManager.getYear();
        const format = `${month} ${day} ${year} y.`;
        
        CalendarManager.getCurrentDateLayout().html(format);
    },
    
    displaySelectedDate() {
        const month  = DateManager.getTextOfMonth();
        const year   = DateManager.getYear();
        const format = `${month}, ${year} y.`;
        CalendarManager.getMonthTitleLayout().html(format);
    }
};

DateManager.displayCurrentTime();
DateManager.displaySelectedDate();
DateManager.displayCurrentDate();