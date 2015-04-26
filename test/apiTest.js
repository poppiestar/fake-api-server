var request = require('supertest')
  , express = require('express');

var app = express();

app.get('/user', function(req, res){
  res.status(200).send({ name: 'tobi' });
});

describe('GET /users', function(){
  it('respond with json', function(done){
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
});

