var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();


describe('user', function() {
  it('signup on /api/v1/signup POST', function(done) {
    chai.request(server)
    .post('/api/v1/auth/signup')
    .send({'username': 'shivansh', 'password': 'james@123'})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.equal('success');
      done();
    });
  });
  it('login /api/v1/login GET', function(done) {
      chai.request(server)
      .post('/api/v1/auth/signup')
      .send({'username': 'shivansh', 'password': 'james@123'})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal('success');
        res.body.should.have.property('token');
        done();
      });
  });
  it('login /api/v1/user/follow POST', function(done) {
    chai.request(server)
    .post('/api/v1/auth/signup')
    .send({'username': 'shivansh', 'password': 'james@123'})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.equal('success');
      res.body.should.have.property('token');
      chai.request(server)
      .post('/api/v1/user/follow')
      .send({'username': 'shivansh', 'password': 'james@123'})
      done();
    });
  });
});