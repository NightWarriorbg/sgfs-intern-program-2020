const CalendarManager = {
    monthTitleText     : $('.month h3'),
    currentTimeText    : $('.date .current-time'),
    
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
    
    getMonthTitleText() {
        return CalendarManager.monthTitleText;
    },
    
    getCurrentTimeText() {
        return CalendarManager.currentTimeText;
    }
};

const DateManager = {
    date : new Date(),
    
    getDateObject() {
        return DateManager.date;
    },
    
    getCurrentMonth() {
        return DateManager.getDateObject().getMonth();
    },
    
    getCurrentTime() {
        const time = DateManager.getDateObject();
        return time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    }
};

CalendarManager.getMonthTitleText().html(CalendarManager.getMonthsCollection()[DateManager.getCurrentMonth()]);
CalendarManager.getCurrentTimeText().html(DateManager.getCurrentTime());

