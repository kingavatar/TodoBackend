'use strict';
const request = require('supertest');
var mongoose = require('mongoose');
const {connectDB,connectProductionDB} = require('../config/db')
//const expect = require("chai").expect;
// app is supposed to point to the app.js file
const app = require('../app');

beforeAll(()=>{ 

  connectDB();
});




describe('Testing POSTS/shots endpoint', function () {
  it('respond with valid HTTP status code and description and message', async ()=> {
      // Make POST Request
    const response = await request(app).post('/api/auth/login').send({
          email:"saidhanush",
          password:"sai"
      }).expect(404);
      
    });
    it('respond with valid HTTP status code and description and message', async ()=> {
      // Make POST Request
      const response = await request(app).post('/api/auth/login').send({
          email:"a@a.com",
          password:"12345678"
      }).expect(200);
      
    });
    
});