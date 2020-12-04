const CalendarManager = {
    
    /**
     * DOM Components
     */
    monthTitleLayout     : $('.month h3'),
    currentDateLayout    : $('.date .current-date'),
    weekdaysLayout       : $('.weekdays'),
    daysLayout           : $('.elements'),
    daysLayoutDiv        : $('.elements div'),
    
    prevMonthButton      : $('.prev-element'),
    nextMonthButton      : $('.next-element'),
    
    /**
     * Calendar Components
     */
    
    date                 : new Date(),
    currentDate          : new Date(),
    
    MONTHS               : [
                            "January", "February", "March", "April", "May", "June", "July", 
                            "August", "September", "October", "November", "December"
    ],
    
    MONTHS_ABR           : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    
    WEEKDAYS             : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    
    DAYS_IN_WEEK         : 7,
    
    currentView          : "days",

    getMonths() {
        return CalendarManager.MONTHS;
    },
    
    getMonthsAbr() {
        return CalendarManager.MONTHS_ABR;
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
    
    getDaysLayoutDiv() {
        return CalendarManager.daysLayoutDiv;
    },
    
    getPrevMonthButton() {
        return CalendarManager.prevMonthButton;
    },
    
    getNextMonthButton() {
        return CalendarManager.nextMonthButton;
    },
    
    getDateObject() {
        return CalendarManager.date;
    },
    
    setDateObject(value) {
        CalendarManager.date = value;
    },
    
    getCurrentDateObj() {
        return CalendarManager.currentDate;
    },
    
    setMonth(month) {
        CalendarManager.getDateObject().setMonth(month);
    },
    
    setYear(year) {
        CalendarManager.getDateObject().setFullYear(year);
    },
    
    updateDateObject(value) {
        CalendarManager.date = value;
    },
    
    getTextOfMonth() {
        return CalendarManager.getMonths()[CalendarManager.getDateObject().getMonth()];
    },
    
    getSeconds() {
        return CalendarManager.getDateObject().getSeconds();
    },
    
    getMinutes() {
        return CalendarManager.getDateObject().getMinutes();
    },
    
    getHours() {
        return CalendarManager.getDateObject().getHours();
    },
    
    getDay() {
        return CalendarManager.getDateObject().getDay();
    },
    
    getYear() {
        return CalendarManager.getDateObject().getFullYear();
    },
    
    setCurrentView(value) {
        CalendarManager.currentView = value;
    },
    
    getCurrentView() {
        return CalendarManager.currentView;
    }
        
};

const Calendar = function () {
    
    function isCurrentDate(value) {
        const date = CalendarManager.getDateObject();
        return value === new Date().getDate() && date.getMonth() === new Date().getMonth();
    }
    
    function emptyLayout() {
        CalendarManager.getWeekdaysLayout().empty();
        CalendarManager.getDaysLayout().empty();
    }
    
    function displayWeekdays() {
        let template = [];
        let length = CalendarManager.WEEKDAYS.length;
        for (let i = 0; i < length; i++) {
            template.push(`<div>${CalendarManager.WEEKDAYS[i]}</div>`);
        }
        
        CalendarManager.getWeekdaysLayout().html(template.join(''));
    }
    
    function displayDays() {
        const date                             = CalendarManager.getDateObject();
        date.setDate(1);
        let template                           = [];
        let firstDayOfCurrentMonth             = date.getDay();
        const prevLastDayOfMonth               = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        
        for(let i = firstDayOfCurrentMonth; i > 0; i-- ) {
            template.push(`<div class="prev-element day">${prevLastDayOfMonth - i + 1}</div>`);
        }
        
        const lastDayOfMonth                   = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        
        for (let i = 1; i <= lastDayOfMonth; i++) {
                       
            if (isCurrentDate(i)) {
                template.push(`<div class="current-element day">${i}</div>`);
            } else {
                template.push(`<div class="day">${i}</div>`);
            }
            
        }
        
        const lastDayOfCurrentMonth            = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
        const daysOfNextMonth                  = CalendarManager.DAYS_IN_WEEK - lastDayOfCurrentMonth ;
        
        for (let i = 1; i < daysOfNextMonth; i++) {
            template.push(`<div class="next-element day">${i}</div>`);
        }
        
        CalendarManager.getDaysLayout().html(template.join(''));
    }
    
    function displayMonths() {
        const date         = CalendarManager.getDateObject();
        let template       = [];
        const length       = CalendarManager.getMonthsAbr().length;
        for(let i = 0; i < length; i++) {

            if(isCurrentDate(i)) {
                template.push(`<div class="current-element month">${CalendarManager.getMonthsAbr()[i]}</div>`);
            } else {
                template.push(`<div class="month">${CalendarManager.getMonthsAbr()[i]}</div>`);
            }
        }
        
        for(let i = 0; i < 4; i++) {
            template.push(`<div class="next-element month">${CalendarManager.getMonthsAbr()[i]}</div>`);
        }
        
        CalendarManager.getDaysLayout().html(template.join(''));
        
        let months = $('.month').on('click', (e) => {
            
        });
    }
    
    function displayYears() {
        const date         = CalendarManager.getDateObject();
        let template       = [];
        const length       = CalendarManager.getYear() + 9;
        for(let i = CalendarManager.getYear(); i <= length; i++) {
            
            const isCurrentYear = i === new Date().getFullYear();
            if(isCurrentYear) {
                template.push(`<div class="current-element year">${i}</div>`);
            } else {
                template.push(`<div class="year">${i}</div>`);
            }
        }
        
        for(let i = length + 1; i < length + 7; i++) {
            template.push(`<div class="next-element year">${i}</div>`);
        }
        
        CalendarManager.getDaysLayout().html(template.join(''));
    }
    
    function displayCurrentDate() {
        const day         = CalendarManager.getDay();
        const month       = CalendarManager.getTextOfMonth();
        const year        = CalendarManager.getYear();
        
        CalendarManager.getCurrentDateLayout().html(CalendarManager.getCurrentDateObj().toDateString());
    }
    
    function chooseSelectedDateFormat() {
        const month  = CalendarManager.getTextOfMonth();
        const year   = CalendarManager.getYear();
        if (CalendarManager.getCurrentView().localeCompare("months") === 0) {
            return year;
        }
        
        if (CalendarManager.getCurrentView().localeCompare("years") === 0) {
            return `${year} - ${year+9}`;
        }
        
        return `${month}, ${year}`;
    }
    
    function displaySelectedDate() {
        const format = chooseSelectedDateFormat();
        CalendarManager.getMonthTitleLayout().html(format);
    }
    
    function selectDay() {
        let days = $('.day').removeClass('selected');
        days.on('click', (e) => {
            //e.target.classList.add('selected');
            
        });
    }
    
    function render() {
        if (CalendarManager.getCurrentView().localeCompare("months") === 0) {
            emptyLayout();
            displayMonths();
            displaySelectedDate();
        } else if(CalendarManager.getCurrentView().localeCompare("years") === 0) {
            emptyLayout();
            displayYears();
            displaySelectedDate();
        } else {
            displayWeekdays();
            displayDays();
            displaySelectedDate();
            selectDay();
        }
        
        displayCurrentDate();
    }
    
    function previous() {
        let date = CalendarManager.getDateObject();
        CalendarManager.getPrevMonthButton().on('click', () => {
            if (CalendarManager.getCurrentView().localeCompare("days") === 0) {
                CalendarManager.setMonth(date.getMonth() - 1); 
            } else if (CalendarManager.getCurrentView().localeCompare("months") === 0) {
                CalendarManager.setYear(date.getFullYear() - 1);
            } else {
                CalendarManager.setYear(date.getFullYear() - 9);
            }
            render();
        });
    }
    
    function next() {
        let date = CalendarManager.getDateObject();
        CalendarManager.getNextMonthButton().on('click', () => {
            if (CalendarManager.getCurrentView().localeCompare("days") === 0) {
                CalendarManager.setMonth(date.getMonth() + 1); 
            } else if (CalendarManager.getCurrentView().localeCompare("months") === 0) {
                CalendarManager.setYear(date.getFullYear() + 1);
            } else {
                CalendarManager.setYear(date.getFullYear() + 9);
            }
            render();
        });
    }
    
    function switchView() {
        CalendarManager.getMonthTitleLayout().on('click', () => {
            if (CalendarManager.getCurrentView().localeCompare("days") === 0) {
                CalendarManager.setCurrentView("months");
                return render();
            } 
            
            if (CalendarManager.getCurrentView().localeCompare("months") === 0) {
                CalendarManager.setCurrentView("years");
                return render();
            }
        });
    }
    
    function resetDate() {
        const currentDate = new Date();
        CalendarManager.setMonth(currentDate.getMonth());
        CalendarManager.setYear(currentDate.getFullYear());
    }
    
    function resetView() {
        CalendarManager.getCurrentDateLayout().on('click', () => {
            CalendarManager.setCurrentView("days");
            resetDate();
            render();
        });
    }
    
    function Constructor() {
        render();
        previous();
        next();
        switchView();
        resetView();
    }
    
    return new Constructor();
}();