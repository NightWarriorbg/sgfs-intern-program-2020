const CalendarManager = {
    monthTitleLayout     : $('.month h3'),
    currentTimeLayout    : $('.date .current-time'),
    currentDateLayout    : $('.date .current-date'),
    weekdaysLayout       : $('.weekdays'),
    daysLayout           : $('.days'),
    
    prevMonthButton      : $('.prev-month'),
    nextMonthButton      : $('.next-month'),
    
    MONTHS               : [
                            "January", "February", "March", "April", "May", "June", "July", 
                            "August", "September", "October", "November", "December"
    ],
    
    WEEKDAYS             : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    
    DAYS_IN_WEEK         : 7,

    getMonths() {
        return CalendarManager.MONTHS;
    },
    
    getWeekdays() {
        return CalendarManager.WEEKDAYS;
    },
    
    getMonthTitleLayout() {
        return CalendarManager.monthTitleLayout;
    },
    
    getCurrentTimeLayout() {
        return CalendarManager.currentTimeLayout;
    },
    
    getCurrentDateLayout() {
        return CalendarManager.currentDateLayout;
    },
    
    getWeekdaysLayout() {
        return CalendarManager.weekdaysLayout;
    },
    
    getDaysLayout() {
        return CalendarManager.daysLayout;
    },
    
    getPrevMonthButton() {
        return CalendarManager.prevMonthButton;
    },
    
    getNextMonthButton() {
        return CalendarManager.nextMonthButton;
    },
    
    displayWeekdays() {
        let template = [];
        let length = CalendarManager.WEEKDAYS.length;
        for (let i = 0; i < length; i++) {
            template.push(`<div>${CalendarManager.WEEKDAYS[i]}</div>`);
        }
        
        CalendarManager.getWeekdaysLayout().html(template.join(''));
    },
    
    displayDays() {
        const date                             = DateManager.getDateObject();
        let template                           = [];
        let firstDayOfCurrentMonth             = date.getDay();
        const prevLastDayOfMonth               = new Date(date.getFullYear(), date.getMonth(), 0).getDate() + 1;
        
        for(let i = firstDayOfCurrentMonth - 1; i > 0; i-- ) {
            template.push(`<div class="prev-days">${prevLastDayOfMonth - i}</div>`);
        }
        
        const lastDayOfMonth                   = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        
        for (let i = 1; i <= lastDayOfMonth; i++) {
            
            const isCurrentDay                 = i === new Date().getDate() && date.getMonth() === new Date().getMonth();
            
            if (isCurrentDay) {
                template.push(`<div class="current-day">${i}</div>`);
            } else {
                template.push(`<div>${i}</div>`);
            }
        }
        
        const lastDayOfCurrentMonth            = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
        
        const daysOfNextMonth                  = CalendarManager.DAYS_IN_WEEK - lastDayOfCurrentMonth + 7;
        
        for (let i = 1; i <= daysOfNextMonth; i++) {
            template.push(`<div class="next-days">${i}</div>`);
        }
        
        CalendarManager.getDaysLayout().html(template.join(''));
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
        return CalendarManager.getMonths()[DateManager.getDateObject().getMonth()];
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
        const currentDate = DateManager.getDateObject();
        
        const secs        = DateManager.addZeroPrefix(currentDate.getSeconds());
        const mins        = DateManager.addZeroPrefix(currentDate.getMinutes());
        const hours       = DateManager.addZeroPrefix(currentDate.getHours());
        
        CalendarManager.getCurrentTimeLayout().html(DateManager.setCurrentTimeFormat(secs, mins, hours));
        setTimeout(() => { DateManager.displayCurrentTime(); }, 1000);
    },
    
    displayCurrentDate() {
        const day    = DateManager.getDay();
        const month  = DateManager.getTextOfMonth();
        const year   = DateManager.getYear();
        const format = `${month} ${day} ${year} y.`;
        
        CalendarManager.getCurrentDateLayout().html(DateManager.getDateObject().toDateString());
    },
    
    displaySelectedDate() {
        const month  = DateManager.getTextOfMonth();
        const year   = DateManager.getYear();
        const format = `${month}, ${year} y.`;
        CalendarManager.getMonthTitleLayout().html(format);
    }
};



(function() {
    function renderCalendar() {
        CalendarManager.displayWeekdays();
        CalendarManager.displayDays();
        DateManager.displayCurrentTime();
        DateManager.displaySelectedDate();
        DateManager.displayCurrentDate();
    }
    
    function Constructor() {
        renderCalendar();
    }
    
    function previousMonth() {
        const date = DateManager.getDateObject();
        CalendarManager.getPrevMonthButton().on('click', () => {
            date.setMonth(date.getMonth() - 1);
            renderCalendar();
        });
    }
    
    function nextMonth() {
        const date = DateManager.getDateObject();
        CalendarManager.getNextMonthButton().on('click', () => {
            date.setMonth(date.getMonth() + 1);
            renderCalendar();
        });
    }
    
    return new Constructor();
})();
