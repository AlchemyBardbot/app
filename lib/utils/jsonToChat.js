const { json } = require('express');
const { getGenres } = require('../models/Genre');

function jsonToChat(arr) {
    return arr.map(item => item.toString());
  
}


const testTry = jsonToChat();


console.log('HELLO', testTry);
