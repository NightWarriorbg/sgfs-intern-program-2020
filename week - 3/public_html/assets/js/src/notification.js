/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function notify(text) {
    if (!("Notification" in window)) {
       alert("This browser does not support desktop notification");
  }
  
    if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                return new Notification(text);
            }
        });
    }
    
    return new Notification(text);
}

