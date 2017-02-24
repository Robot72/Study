// Задача: db.dropCollection вызвать для всех коллекций одновременно

const mongoose = require('mongoose');
const clearDatabase = require('./clearDatabase');

const path = require('path');

const fixturesPath = path.join(__dirname, 'fixtures');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/test');
// mongoose.set('debug', true);

mongoose.plugin(schema => {
  // http://mongoosejs.com/docs/guide.html#emitIndexErrors
  schema.options.emitIndexErrors = true;
});

require('./user');

(async () => {

  await clearDatabase();

  let fixtures = require('fs').readdirSync(fixturesPath);

  let promises = [];
  for (let file of fixtures) {
    let models = require(path.join(fixturesPath, file));
    for (let name in models) {
      let modelObjects = models[name];

      for (let modelObject of modelObjects) {
        console.log(name, modelObject);
        promises.push(mongoose.model(name).create(modelObject));
      }
    }
  }

})().catch(console.error).then(() => mongoose.disconnect());
