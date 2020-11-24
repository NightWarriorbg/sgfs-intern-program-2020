/**
 * Javascript library - LaiTe
 * @author - NightWarrior(Radoslav Enev)
 * @type LaiTe$.Constructor
 * @return {Constructor} the constructor of the library
 */
let $ = ( function() {
    'use strict';
    
    /**
     * The default constructor of the library
     * @param{String} selector - the query selector
     */
    function Constructor(selector) {
        if (!selector) {
            return;
        }
        
        if (selector === 'document') {
            this.nodes = [document];
        } else if(selector === 'window') {
            this.nodes = [window];
        } else {
            this.nodes = document.querySelectorAll(selector); 
        }
    }
    
    /**
     * Initiliazes the library
     * @param {String} selector
     */
    function Initialize(selector) {
        return new Constructor(selector);
    }
    
    /**
     * Iterates through every element
     * @param {type} callback
     * @returns {undefined}
     */
    Constructor.prototype.forEach = function (callback) {
        if (!callback || typeof callback !== 'function') {
            return;
        }
        
        for(let i = 0; i < this.nodes.length - 1; i++) {
            callback(this.nodes[i]);
        }
        
        return this;
    };
    
    /**
     * Adds a class to elements
     * @param {String} name - class name
     * @returns {LaiTe$.Constructor.prototype}
     */
    Constructor.prototype.addClass = function(name) {
        this.each(function(element) {
            element.classList.add(name);
        });
        return this;
    };
    
    /**
     * Removes a class to elements
     * @param {String} name - class name
     * @returns {LaiTe$.Constructor.prototype}
     */
    Constructor.prototype.removeClass = function(name) {
        this.each(function(element) {
            element.classList.remove(name);
        });
        return this;
    };
    
    Constructor.prototype.css = function (property, value) {
        this.each(function (element) {
           element.style[property] = value; 
        });
        
        return this;
    };
    
    
    
    return new Initialize();
})();

var a = $('#test').css('color', 'red');
