let assert = require('assert');
let server = require('../1-get-post-delete-server/server');
let rp = require('request-promise');

let app;

describe('Server test', () => {

  before((done) => {
    app = server.listen(3000, done);
  });

  after((done) => {
    app.close(done);
  });

  context('GET request', () => {

    it('should return index.html', async () => {
      let response = await rp('http://localhost:3000/', {
        resolveWithFullResponse: true
      });
      assert.equal(response.statusCode, 200);
      assert.equal(response.headers['content-type'], 'text/html');
    });

  })
});
