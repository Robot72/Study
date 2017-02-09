const assert = require('assert');
const request = require('request');
const server = require('../server');

let app;

describe("server tests", () => {

  before(done => {
    app = server.listen(3333, done);
  });

  after(done => {
    app.close(done);
  });

  context("GET request", () => { // context

    it("should returns index.html", done => {

      request('http://localhost:3333/', function (error, response, body) {
        assert.equal(response.statusCode, 200);
        assert.equal(response.headers['content-type'], 'text/html');

        done();
      });

    });

  });

});
