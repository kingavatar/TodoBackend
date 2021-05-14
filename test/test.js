// 'use strict';
const request = require('supertest');
var mongoose = require('mongoose');
const {connectDB} = require('../config/db');
const User=require('../models/User');


// app is supposed to point to the app.js file

const myApp = require('../app');

const app = myApp.listen(3000);

beforeAll(async ()=>{ 
  await connectDB();
});
afterAll(async () => { 
    
  await User.findOneAndDelete({email:"signuptest1@gmail.com"});
  await User.findOneAndDelete({email:"signuptest2@gmail.com"});
  await mongoose.connection.close();
   
});


describe('Testing',()=>{
    it('Testing to see if Jest works', () => {
        expect(1).toBe(1)
      })
    it('Testing to see if Jest works', () => {
        expect(1+1).toBe(2)
      })  

})



describe('Testing POSTS/login,Signup endpoint', function () {
  it('Test1 for signin user doesnot exist', async ()=> {
      // Make POST Request
    const response = await request(app).post('/api/auth/signin').send({
          email:"saidhanush",
          password:"sai"
      }).expect(401);
      
    });
    it('Test2 for signin user which exists', async ()=> {
      // Make POST Request
      const response = await request(app).post('/api/auth/signin').send({
          email:"a@a.com",
          password:"12345678"
      }).expect(200);
    //   console.log(response);
    //   response.expect(404);
      
    });
    it('Test3 for signin user doesnot exist', async ()=> {
      // Make POST Request
      const response = await request(app).post('/api/auth/signin').send({
          email:"purvaj",
          password:"12345678"
      }).expect(401);
    //   console.log(response);
    //   response.expect(404);
      
    });
    it('Test4 for signin user doesnot exist', async ()=> {
      // Make POST Request
      const response = await request(app).post('/api/auth/signin').send({
          email:"random",
          password:"password"
      }).expect(401);
    //   console.log(response);
    //   response.expect(404);
      
    });
    it('Test5 for signup user doesnot exist', async ()=> {
      // Make POST Request
      const response = await request(app).post('/api/auth/signup').send({
          email:"signuptest1@gmail.com",
          password:"password1",
          firstName:"testname"
       }).expect(201);
       
     });

     it('Test6 for signup user exists', async ()=> {
      // Make POST Request
      const response = await request(app).post('/api/auth/signup').send({
          email:"signuptest2@gmail.com",
          password:"password2",
          firstName:"testname"
       }).expect(201);
       
     });
     
   
});