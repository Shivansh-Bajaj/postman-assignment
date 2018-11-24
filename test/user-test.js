var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
chai.use(chaiHttp);

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
  it(' /api/v1/login POST', function(done) {
      chai.request(server)
      .post('/api/v1/auth/login')
      .send({'username': 'shivansh', 'password': 'james@123'})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        // res.body.should.have.property('status');
        res.body.status.should.equal('success');
        res.body.should.have.property('token');
        done();
      });
  });
  it('follow /api/v1/user/follow POST', function(done) {
    chai.request(server)
    .post('/api/v1/auth/login')
    .send({'username': 'shivansh', 'password': 'james@123'})
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.equal('success');
      res.body.should.have.property('token');
      chai.request(server)
      .post('/api/v1/user/follow')
      .send({'username': 'james'})
      .end(function(err, res) { 
        res.should.have.status(401);
        done();
      });
    });
  });
  it('follow /api/v1/user/follow POST', function(done) {
    chai.request(server)
    .post('/api/v1/auth/login')
    .send({'username': 'shivansh', 'password': 'james@123'})
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.equal('success');
      res.body.should.have.property('token');
      chai.request(server)
      .post('/api/v1/user/follow')
      .set('Authorization', 'bearer ' + res.body.token)
      .send({'username': 'james'})
      .end(function(err, res) { 
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal('success');
        done();
      });
    });
  });
  it('unfollow /api/v1/user/unfollow POST', function(done) {
    chai.request(server)
    .post('/api/v1/auth/login')
    .send({'username': 'shivansh', 'password': 'james@123'})
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.equal('success');
      res.body.should.have.property('token');
      chai.request(server)
      .post('/api/v1/user/unfollow')
      .send({'username': 'james'})
      .end(function(err, res) { 
        res.should.have.status(401);
        done();
      });
    });
  });
  it('unfollow /api/v1/user/unfollow POST', function(done) {
    chai.request(server)
    .post('/api/v1/auth/login')
    .send({'username': 'shivansh', 'password': 'james@123'})
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.status.should.equal('success');
      res.body.should.have.property('token');
      chai.request(server)
      .post('/api/v1/user/unfollow')
      .set('Authorization', 'bearer ' + res.body.token)
      .send({'username': 'james'})
      .end(function(err, res) { 
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal('success');
        done();
      });
    });
  });
});