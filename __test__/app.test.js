require('dotenv').config();	

const request = require('supertest');	
const app = require('../lib/app');	
const connect = require('../lib/utils/connect');	
const mongoose = require('mongoose');	

describe('Fish routes', () => {	
  beforeAll(() => {	
    connect();	
  });	

  afterAll(() => {	
    return mongoose.connection.close();	
  });	
 
  it('can get fish by month', () => {
    // return request(app)
    //   .get('/api/v1/fish/?start=4&end=4')
    //   .then(res => {
    //     expect(res.body.length).toEqual(34);
    //   });
  });
});
