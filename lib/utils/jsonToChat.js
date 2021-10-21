module.exports = function jsonToChat(arr) {
    return arr.map(({ genre, count }) => `${genre}: ${count}`).join('\n');
};
