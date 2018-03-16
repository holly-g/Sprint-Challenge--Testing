const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const Game = require('./models');
const server = require('./server');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

describe('Games', () => {
  before(done => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('we are connected');
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('we are disconnected');
    });
  });
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    Game.create({
      tite: 'California Games',
      genre: 'Sports',
      date: 'June 1987'
    })
    .then(res => {
      done();
    })
    .catch(err => {
      done(err);
    });
  });

  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({})
    .then(res => {
      done();
    })
    .catch(err => {
      done(err);
    })
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it('should post correctly to database', done => {
      const game = {
        tite: 'California Games',
        genre: 'Sports',
        date: 'June 1987'
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(game)
        .then((res) => {

          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('California Games');
          expect(res.body.genre).to.equal('Sports');

          done();
       })
       .catch(err => {
         done(err);
    });
  });

  // test the GET here
  describe('[GET] /api/game/get', () => {
    it('should get correctly to database', () => {
      chai
        .request(server)
        .get('/api/game/get')
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body[0].title).to.equal('California Games');
          done();
        })
        .catch(err => {
          done(err);
    });
  });
  // test the PUT here
  describe('[PUT] /api/game/update', () => {
    it('should correctly update a game', () => {
      const gameUpdate = {
        title: 'Updated Game',
        id: someID
      }
      chai
        .request(server)
        .put('api/game/update')
        .send(gameUpdate)
        .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.title).to.equal()
        });
     });
  });
  // --- Stretch Problem ---
  // Test the DELETE here
});
