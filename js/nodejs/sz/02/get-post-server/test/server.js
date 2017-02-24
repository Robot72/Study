const assert = require('assert');
const rp = require('request-promise')
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

    it("should returns index.html", async () => {

      const response = await rp('http://localhost:3333/', {
        resolveWithFullResponse: true
      });

      assert.equal(response.statusCode, 200);
      assert.equal(response.headers['content-type'], 'text/html');

    });

  });

});
