const ClockManager = {
        currentTimeLayout : $('.date .current-time'),
        
        getCurrentTimeLayout() {
            return ClockManager.currentTimeLayout;
        },
        
        setCurrentTimeFormat(secs, mins, hours) {
            return `${hours}:${mins}:${secs}`;
        }
};

const clock = (function() {
    
    function addZeroPrefix(time) {
        if (time < 10) {
            return `0${time}`;
        }
        
        return time;
    }
    
    function displayCurrentTime() {
        const time  = new Date();
        
        const secs  = addZeroPrefix(time.getSeconds());
        const mins  = addZeroPrefix(time.getMinutes());
        const hours = addZeroPrefix(time.getHours());
        
        ClockManager.getCurrentTimeLayout().html(ClockManager.setCurrentTimeFormat(secs, mins, hours));
        setTimeout(() => { displayCurrentTime(); }, 1000);
    }
    
    function Constructor() {
        displayCurrentTime();
    }
    
    return new Constructor();
     
})();