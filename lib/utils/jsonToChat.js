const { json } = require('express');
const { getGenres } = require('../models/Genre');

module.exports = function jsonToChat(arr) {
    const getGenre = arr.map((item) => {
        return `${item.genre}: ${item.count}`;
    });
    return getGenre.join('\n');
};
