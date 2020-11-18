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
        list.push(callback(item));
    });

    return list;
}

/**
 * Fills an already existing array with more random elements
 * @param {Array} - the list of random elements to be used
 * @param {number} - the number of elements to be added from the random list
 * @return {Array} - a list with elements
 */
Array.prototype.myFill = function(source, length) {

    if (source.length > length) {
        return this;
    }

    for (let i = 0; i < length; i++) {
        let rndIndex = getRandomNumber(0, source.length - 1);
        this.push(source[rndIndex]);
    }

    return this;

}


/**
 * Reverses a list of elements or a list of lists
 */
Array.prototype.myReverse = function() {

    let reversed = reverseArray(this);

    if(!this[0].constructor === Array) {
        return reversed;
    }

    let newArray = [];

    reversed.forEach(array => {
        newArray.push(reverseArray(array));
    });

    return newArray;

    /**
     * Reverses a single list
     * @param {Array} list 
     */
    function reverseArray(list) {
        let newArr = [];

        for (let i = list.length - 1; i >= 0; i--) {
            newArr.push(list[i]);
        }

        return newArr;
    }
}

/**
 * Testing
 */

let arr1 = [1, 2, 3, 4, 5, 6];
let arr2 = [[1, 2, 3, 4], ['a', 'b', 'c', 'd']];

function testForEach() {
    console.log("forEach: ");

    arr1.forEach(item => {
        console.log(item);
    });

    console.log("\n");
}

function testMyFilter() {
    let arr = arr1.myFilter(item => item > 2);
    console.log("Filter: ");
    console.log(arr);
    console.log("\n");
}

function testMyMap() {
    let arr = arr1.myMap(x => x + 1);
    console.log("Map: ");
    console.log(arr);
    console.log("\n");
}


function testMyFill() {
    let arr = arr1.myFill([4, 'd', 7], 4);
    console.log("Fill: ");
    console.log(arr);
}

function testMyReverse() {
    let arr = arr2.myReverse();
    console.log("Reverse: ");
    console.log(arr);
    console.log("\n");
}

testForEach();
testMyFilter();
testMyMap();
testMyFill();
testMyReverse();