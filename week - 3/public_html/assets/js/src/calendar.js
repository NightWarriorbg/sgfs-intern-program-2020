const CalendarManager = {
    
    /**
     * DOM Components
     */
    monthTitleLayout     : $('.month_header h3'),
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
    eventDate            : new Date(),
    
    MONTHS               : [
                            "January", "February", "March", "April", "May", "June", "July", 
                            "August", "September", "October", "November", "December"
    ],
    
    MONTHS_ABR           : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    WEEKDAYS             : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], 
    WEEKDAYS_FULL        : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    DAYS_IN_WEEK         : 7,
    YEARS_TO_DISPLAY     : 10,
    
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
    
    getEventDateObj() {
        return CalendarManager.eventDate;
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
    
    getMonth() {
        return CalendarManager.getDateObject().getMonth();
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

function emptyLayout() {
        CalendarManager.getWeekdaysLayout().empty();
        CalendarManager.getDaysLayout().empty();
    }
    
    function isView(view) {
        return CalendarManager.getCurrentView().localeCompare(view) == 0;
    }
    
    function displayWeekdays() {
        let template = [];
        let length = CalendarManager.WEEKDAYS.length;
        for (let i = 0; i < length; i++) {
            template.push(`<div>${CalendarManager.WEEKDAYS[i]}</div>`);
        }
        
        CalendarManager.getWeekdaysLayout().html(template.join(''));
    }
    
    function selectDay() {
        let days = $('.day');
        
        days.on('click', (e) => {
            
            const date   = CalendarManager.getEventDateObj();
            const year   = CalendarManager.getYear();
            const month  = CalendarManager.getMonth();
            const day    = e.target.innerHTML; 
            
            date.setFullYear(year);
            date.setMonth(month);
            date.setDate(day);
            
            const format = `${CalendarManager.WEEKDAYS_FULL[date.getDay()]} ${date.getDate()}`;
            EventDomManager.getSelectedDay().html(format);
            
            renderEvents();
        });
    }
    
    function displayDays() {
        const date                             = CalendarManager.getDateObject();
        date.setDate(1);
        //date.setMonth(month);
        
        let template                           = [];
        let firstDayOfCurrentMonth             = date.getDay();
        const prevLastDayOfMonth               = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        
        for(let i = firstDayOfCurrentMonth; i > 0; i-- ) {
            template.push(`<div class="prev-element day">${prevLastDayOfMonth - i + 1}</div>`);
        }
        
        const lastDayOfMonth                   = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        
        for (let i = 1; i <= lastDayOfMonth; i++) {
             
            const isCurrentDay = i === new Date().getDate() && date.getMonth() === new Date().getMonth();
            
            if (isCurrentDay) {
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
        
        selectDay();
    }
    
    function selectMonth() {
        let months = $('.month');
        
             months.on('click', (e) => {
                const date           = CalendarManager.getDateObject();
                const selectedMonth  = e.target.innerHTML;
                const monthIndex = CalendarManager.getMonthsAbr().findIndex(month => month == selectedMonth);
                
                if (e.target.classList.contains("next-month")) {
                    date.setFullYear(date.getFullYear() + 1);
                }
                
                date.setMonth(monthIndex);
                CalendarManager.setCurrentView("days");
                render();
        });
    }
    
    function displayMonths() {
        const date         = CalendarManager.getDateObject();
        let template       = [];
        const length       = CalendarManager.getMonthsAbr().length;
        for(let i = 0; i < length; i++) {

            const isCurrentMonth = i === new Date().getMonth();
            
            if(isCurrentMonth) {
                template.push(`<div class="current-element month">${CalendarManager.getMonthsAbr()[i]}</div>`);
            } else {
                template.push(`<div class="month">${CalendarManager.getMonthsAbr()[i]}</div>`);
            }
        }
        
        for(let i = 0; i < 4; i++) {
            template.push(`<div class="next-element month next-month">${CalendarManager.getMonthsAbr()[i]}</div>`);
        }
        
        CalendarManager.getDaysLayout().html(template.join(''));
        
        selectMonth();
    }
    
    function selectYear() {
        let years = $('.year');
        
        years.on('click', (e) => {
            const date = CalendarManager.getDateObject();
            const selectedYear = e.target.innerHTML;
            
            date.setFullYear(selectedYear);
            CalendarManager.setCurrentView("months");
            render();
        });
    }
    
    function displayYears() {
        const date         = CalendarManager.getDateObject();
        let template       = [];
        const length       = CalendarManager.getYear() + CalendarManager.YEARS_TO_DISPLAY;
        
        for(let i = length - 3; i < length; i++) {
            template.push(`<div class="prev-element year">${i}</div>`);
        }
        
        for(let i = CalendarManager.getYear(); i < length; i++) {
            
            const isCurrentYear = (i === new Date().getFullYear());
            
            if(isCurrentYear) {
                template.push(`<div class="current-element year">${i}</div>`);
            } else {
                template.push(`<div class="year">${i}</div>`);
            }
        }
        
        for(let i = length; i < length + 3; i++) {
            template.push(`<div class="next-element year">${i}</div>`);
        }
        
        CalendarManager.getDaysLayout().html(template.join(''));
        
        selectYear();
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
        if (isView("months")) {
            return year;
        }
        
        if (isView("years")) {
            return `${year} - ${year+9}`;
        }
        
        return `${month}, ${year}`;
    }
    
    function displaySelectedDate() {
        const format = chooseSelectedDateFormat();
        CalendarManager.getMonthTitleLayout().html(format);
    }

const Calendar = (function () {
    
    function render() {
        if (isView("months")) {
            emptyLayout();
            displayMonths();
            displaySelectedDate();
            //selectMonth();
        } else if(isView("years")) {
            emptyLayout();
            displayYears();
            displaySelectedDate();
            //selectYear();
        } else {
            displayWeekdays();
            displayDays();
            displaySelectedDate();
            //selectDay();
        }
        
        displayCurrentDate();
        //renderEvents(CalendarManager.getDateObject());
    }
       
    function previous() {
        let date = CalendarManager.getDateObject();
        CalendarManager.getPrevMonthButton().on('click', () => {
            if (isView("days")) {
                CalendarManager.setMonth(date.getMonth() - 1); 
            } else if (isView("months")) {
                CalendarManager.setYear(date.getFullYear() - 1);
            } else {
                CalendarManager.setYear(date.getFullYear() - CalendarManager.YEARS_TO_DISPLAY);
            }
            render();
        });
    }
    
    function next() {
        let date = CalendarManager.getDateObject();
        CalendarManager.getNextMonthButton().on('click', () => {
            if (isView("days")) {
                CalendarManager.setMonth(date.getMonth() + 1); 
            } else if (isView("months")) {
                CalendarManager.setYear(date.getFullYear() + 1);
            } else {
                CalendarManager.setYear(date.getFullYear() + CalendarManager.YEARS_TO_DISPLAY);
            }
            render();
        });
    }
    
    function switchView() {
        CalendarManager.getMonthTitleLayout().on('click', () => {
            if (isView("days")) {
                CalendarManager.setCurrentView("months");
                return render();
            } 
            
            if (isView("months")) {
                CalendarManager.setCurrentView("years");
                return render();
            }
        });
    }
    
    function resetDate() {
        const currentDate = new Date();
        CalendarManager.setMonth(currentDate.getMonth());
        CalendarManager.setYear(currentDate.getFullYear());
        CalendarManager.getEventDateObj().setDate(currentDate.getDate());
        CalendarManager.getEventDateObj().setMonth(currentDate.getMonth());
        CalendarManager.getEventDateObj().setFullYear((currentDate.getFullYear()));
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
        //selectDay();
    }
    
    return new Constructor();
})();