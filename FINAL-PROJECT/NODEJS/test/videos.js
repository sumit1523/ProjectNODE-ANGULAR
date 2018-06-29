
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let videoModel = require('../models/video');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);




describe('/GET Videos', () => {
    it('it should GET all the videos', (done) => {
          chai.request(app)
          .get('/allvideos')
          .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('array');
              res.body.length.should.be.eql(0);
            done();
          });
    });
});

describe('/GET Videos', () => {
    it('it should GET all the videos', (done) => {
          chai.request(app)
          .get('/allvid')
          .end((err, res) => {
              res.should.have.status(404);
            done();
          });
    });
});