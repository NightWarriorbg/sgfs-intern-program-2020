/**
 * Javascript library - LaiTe
 * @author - NightWarrior(Radoslav Enev)
 * @type LaiTe$.Constructor
 * @return {Constructor} the constructor of the library
 */
let $ = (function() {
    'use strict';
    
    /**
     * Creates one or multiple html elements
     * @param {type} str - elements string
     * @returns {DocumentFragment}
     */
    function createElement(str) {
        let div      = document.createElement('div');
        let fragment = document.createDocumentFragment();
        let i        = 0;
        
        div.innerHTML = str;
        
        for (let j = div.childNodes.length; i < j; i++) {
            fragment.appendChild(div.childNodes[i].cloneNode(true));
        }
        
        return fragment;
    }
    
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
        } else if(selector.match(/<([\w-]*)>/)) {
            this.nodes = [createElement(selector)];
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
    Constructor.prototype.each = function(callback) {
        if (!callback || typeof callback !== 'function') {
            return;
        }
        
        for(let i = 0; i < this.nodes.length; i++) {
            callback(this.nodes[i]);
        }
        
        return this;
    };
    
    /**
     * Maps throughs all elements
     * @param {type} callback
     * @returns {LaiTe$.Constructor.prototype}
     */
    Constructor.prototype.map = function(callback) {
        let list = [];
        for (let i = 0; i < this.nodes.length; i++) {
            list.push(callback(this.nodes[i]));
        }
        
        return this;
    };
    
    /**
     * Returns the map if the map has more than 1 elements, otherwise returns first element
     * @params {Function} callback
     * @returns {Map}
     */
    Constructor.prototype.mapOne = function(callback) {
        let map = this.map(callback);
        return map.length > 1 ? map : map[0];
    };
    
    Constructor.prototype.text = function(text) {
        if (typeof text === 'undefined') {
            this.mapOne(function (element) {
                element.innerText;
            });
        }
        
        this.each(function(element) {
            element.innerText = text;
        });
        
        return this;
    };
    
    Constructor.prototype.html = function(html) {
        if (typeof html === 'undefined') {
            this.mapOne(function (element) {
                element.innerHTML;
            });
        }
        
        this.each(function(element) {
            element.innerHTML = html;
        });
        
        return this;
        
    };
    
    Constructor.prototype.css = function(property, value) {
        this.each(function (element) {
           element.style[property] = value; 
        });
        
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
    
    Constructor.prototype.attribute = function(attribute, value) {
        if (typeof value !== "undefined") {
            this.each(function(element) {
                element.setAttribute(attribute, value);
            });
        }
    
       this.mapOne(function(element) {
            element.getAttribute(attribute);
        });
        
        return this;
    };
    
    Constructor.prototype.append = function(element) {
        this.each(item => {
            item.innerHTML = item.innerHTML + element;
        });
        
        return this;
    };
    
    Constructor.prototype.prepend = function(element) {
        this.each(item => {
            item.innerHTML = element + item.innerHTML;
        });
        
        return this;
    };
    
    Constructor.prototype.remove = function() {
        this.each(function (element) {
            return element.parentNode.removeChild(element);
        });
        
        return this;
    };
    
    Constructor.prototype.on = function() {
        if (document.addEventListener) {
            return function (event, func) {
                return this.each(function (element) {
                    element.addEventListener(event, func, false);
                });
            };
        }
        
        return;
    };
    
    Constructor.prototype.off = function() {
        if (document.removeEventListener) {
            return function (event, func) {
                return this.each(function (element) {
                    element.removeEventListener(event, func, false);
                });
            };
        }
        
        return;
    };
    
    Constructor.prototype.parent = function() {
        return this.nodes[0].parentNode;
    };
    
    Constructor.prototype.siblingNext = function() {
        return this.nodes[0].previousElementSibling;
    };
    
    Constructor.prototype.siblingPrev = function() {
        return this.nodes[0].nextElementSibling;
    };
    
    Constructor.prototype.children = function() {
        return this.nodes[0].children;
    };
    
    return Initialize;
    
})();