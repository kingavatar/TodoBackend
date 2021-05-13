// 'use strict';
const request = require('supertest');
var mongoose = require('mongoose');
const {connectDB} = require('../config/db');


// app is supposed to point to the app.js file

const myApp = require('../app');

const app = myApp.listen(3000);

beforeAll(async ()=>{ 
  await connectDB();
});
afterAll(async () => { 
    await mongoose.connection.close()
});


describe('Testing',()=>{
    it('Testing to see if Jest works', () => {
        expect(1).toBe(1)
      })
})



describe('Testing POSTS/shots endpoint', function () {
  it('respond with valid HTTP status code and description and message', async ()=> {
      // Make POST Request
    const response = await request(app).post('/api/auth/signin').send({
          email:"saidhanush",
          password:"sai"
      }).expect(302);
      
    });
    it('respond with valid HTTP status code and description and message', async ()=> {
      // Make POST Request
      const response = await request(app).post('/api/auth/signin').send({
          email:"a@a.com",
          password:"12345678"
      }).expect(200);
    //   console.log(response);
    //   response.expect(404);
      
    });
    it('respond with valid HTTP status code and description and message', async ()=> {
      // Make POST Request
      const response = await request(app).post('/api/auth/signin').send({
          email:"purvaj",
          password:"12345678"
      }).expect(302);
    //   console.log(response);
    //   response.expect(404);
      
    });

    
});