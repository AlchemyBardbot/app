module.exports = function roll(num) {
    num = parseInt(num);
    if (isNaN(num)) return 'Not a valid Number';
    return Math.ceil(Math.random() * num);
};
