const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const router = require('../lib/controllers/router.js');
const Discord = require('discord.js');
const Message = require('discord.js');
console.log('HEYYYYY', Message);
require('dotenv').config();
const token = process.env.BARDBOT_TOKEN;
const client = new Discord.Client();





describe('bardbot routes', () => {



  beforeEach(() => {
 
  }
  );

  it('Check to see if the \'Hello\' message can send ', async() => {
   

    expect().toEqual();
  });


  
  // afterAll(() => {
  //   pool.end();
  // });
});
