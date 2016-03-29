function reverseArray(array) {
    var reversedArray = [];
    array.forEach(function (value, index, arr) {
        reversedArray.unshift(value);
    });
    return reversedArray;
}