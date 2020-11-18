/**
 * Returns a random number in range min - max
 * @param {number} min 
 * @param {number} max 
 */
function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Creates a list prototype that iterates through a list of elements
 * @param {Function} callback 
 */
Array.prototype.myForEach = function (callback) {
    for(let i = 0; i < this.length; i++) {
        callback(this[i]);
    }
}

/**
 * Creates a list prototype that iterates through a list of elements
 * @param {Function} callback - the fuction used to milter the list
 */
Array.prototype.myFilter = function (callback) {
    let list = [];

    this.myForEach((item) => {
        if (callback(item)) {
            list.push(item);
        }
    });

    return list;
}

/**
 * Maps a list in terms of a given function
 * @param {Function} callback - the funtion used to map the list
 */
Array.prototype.myMap = function(callback) {
    
    let list = [];
    this.myForEach((item) => {
        list.push(callback(this));
    });

    return list;
}

/**
 * Fills an already existing array with more random elements
 * @param {Array} - the list of random elements to be used
 * @param {number} - the number of elements to be added from the random list
 * @return {Array} - a list with elements
 */
Array.prototype.myFill() = function(source, length) {

    if (source.length > length) {
        return this;
    }

    for (let i = 0; i < length - 1; i++) {
        let rndIndex = getRandomNumber(0, source.length - 1);
        this.push(source[rndIndex]);
    }

    return this;

}

/*
Array.prototype.myReverse = function() {
    let list = [[]];

    for (let i = this.length - 1; i > 0; i--) {
        this.length > 
    }
}*/

let arr = [1,2,3,4];
let arr2 = arr.filter(item => item > 2);
let arr3 = arr.myFill(['a', 'g', 6], 4);

arr3.myForEach(item => {
    console.log(item);
});