const CalendarManager = {
    monthTitleLayout     : $('.month h3'),
    currentTimeLayout    : $('.date .current-time'),
    
    monthsCollection : [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
],

    getMonthsCollection() {
        return CalendarManager.monthsCollection;
    },
    
    getMonthTitleLayout() {
        return CalendarManager.monthTitleLayout;
    },
    
    getCurrentTimeLayout() {
        return CalendarManager.currentTimeLayout;
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
    
    getCurrentMonth() {
        return DateManager.getDateObject().getMonth();
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
    
    setCurrentTimeFormat(secs, mins, hours) {
        return `${hours}:${mins}:${secs}`;
    },
    
    addZeroPrefix(time) {
        if (time < 10) {
            return `0${time}`;
        }
        
        return time;
    },
    
    currentTime() {
        DateManager.updateDateObject(new Date());
        let currentDate = DateManager.getDateObject();
        
        let secs  = DateManager.addZeroPrefix(currentDate.getSeconds());
        let mins  = DateManager.addZeroPrefix(currentDate.getMinutes());
        let hours = DateManager.addZeroPrefix(currentDate.getHours());
        
        CalendarManager.getCurrentTimeLayout().html(DateManager.setCurrentTimeFormat(secs, mins, hours));
        setTimeout(function () { DateManager.currentTime(); }, 1000);
    }
};

CalendarManager.getMonthTitleLayout().html(CalendarManager.getMonthsCollection()[DateManager.getCurrentMonth()]);

DateManager.currentTime();