var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
chai.use(chaiHttp);

describe('tweet', function() {
  it('create tweet on /api/v1/tweet POST', function(done) {
    chai.request(server)
    .post('/api/v1/auth/login')
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
});