/* global describe, before, beforeEach, after, it, context */

// (!!!) encoding: null to get buffer,
// https://github.com/request/request/issues/823#issuecomment-59208292
const request = require("request").defaults({
  encoding: null
});

// TDD
// Test Driven Development

const should = require('should');

// make sure you run it in test env
should(process.env.NODE_ENV).eql('test');

const fs = require('fs-extra');
const config = require('config');
const Readable = require('stream').Readable;

const host = 'http://127.0.0.1:3000';

const server = require('../server');

// not in config, because many test dirs are possible
const fixturesRoot = __dirname + '/fixtures';


describe("Server", () => {
  before(done => {
    server.listen(3000, '127.0.0.1', done);
  });

  after(done => {
    server.close(done);
  });

  beforeEach(() => {
    fs.emptyDirSync(config.get('filesRoot'));
  });

  describe("GET /file.ext", () => {

    context("When exists", () => {
      beforeEach(() => {
        // "before" will not do here,
        // because it works "before tests"
        // and parent beforeEach works "before each test", that is after before
        fs.copySync(`${fixturesRoot}/small.png`, config.get('filesRoot') + '/small.png');
      });

      it("returns 200 & the file", done => {
        let fixtureContent = fs.readFileSync(`${fixturesRoot}/small.png`);

        request.get(`${host}/small.png`, (error, response, body) => {
          if (error) return done(error);
          // (!!!) not body.should.eql(fixtureContent),
          // cause buffers are compared byte-by-byte for diff (slow)
          body.equals(fixtureContent).should.be.true();
          done();
        });


      });
    });

    context("otherwise", () => {
      it("returns 404", done => {

        request.get(`${host}/small.png`, (error, response) => {
          if (error) return done(error);
          response.statusCode.should.be.equal(404);
          done();
        });

      });

    });
  });

  describe("GET /nested/path", () => {
    it("returns 400", done => {

      request.get(`${host}/nested/path`, (error, response) => {
        if (error) return done(error);
        response.statusCode.should.be.equal(400);
        done();
      });

    });

  });

  describe("POST /file.ext", () => {

    context("When exists", () => {
      beforeEach(() => {
        fs.copySync(`${fixturesRoot}/small.png`, config.get('filesRoot') + '/small.png');
      });

      context("When small file size", () => {
        it("returns 409 & file not modified", done => {

          let mtime = fs.statSync(config.get('filesRoot') + '/small.png').mtime;

          let req = request.post(`${host}/small.png`, (error, response) => {
            if (error) return done(error);

            let newMtime = fs.statSync(config.get('filesRoot') + '/small.png').mtime;

            // eql compares dates the right way
            mtime.should.eql(newMtime);

            response.statusCode.should.be.equal(409);
            done();
          });

          fs.createReadStream(`${fixturesRoot}/small.png`).pipe(req);

        });

        context('When zero file size', () => {
          it('returns 409', done => {
            let req = request.post(`${host}/small.png`, (error, response) => {
              if (error) return done(error);

              response.statusCode.should.be.equal(409);
              done();
            });

            // emulate zero-file
            let stream = new Readable();

            stream.pipe(req);
            stream.push(null);

          });
        });


      });

      context("When too big", () => {

        it("returns 413 and no file appears", done => {

          let req = request.post(`${host}/big.png`, (error, response) => {
            if (error) {
              // see this for description https://github.com/nodejs/node/issues/947#issue-58838888
              // there is a problem in nodejs with it
              if (error.code === 'ECONNRESET' || error.code === 'EPIPE') {
                return done();
              } else {
                return done(error);
              }
            }
            response.statusCode.should.be.equal(413);

            fs.existsSync(config.get('filesRoot') + '/big.png').should.be.false();
            done();
          });

          fs.createReadStream(`${fixturesRoot}/big.png`).pipe(req);
        });

      });
    });

    context("otherwise with zero file size", () => {

      it('returns 200 & file is uploaded', done => {
        let req = request.post(`${host}/small.png`, error => {
          if (error) return done(error);

          fs.statSync(config.get('filesRoot') + '/small.png').size.should.equal(0);

          done();
        });

        let stream = new Readable();

        stream.pipe(req);
        stream.push(null);

      });

    });

    context("otherwise", () => {

      it("returns 200 & file is uploaded", done => {
        let req = request.post(`${host}/small.png`, error => {
          if (error) return done(error);
          fs.readFileSync(config.get('filesRoot') + '/small.png').equals(
            fs.readFileSync(`${fixturesRoot}/small.png`)
          ).should.be.true();
          done();

        });

        fs.createReadStream(`${fixturesRoot}/small.png`).pipe(req);
      });
    });

  });


});
