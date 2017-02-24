const mongoose = require('mongoose');
const co = require('co');
const clearDatabase = require('./clearDatabase');

const fs = require('fs');
const path = require('path');

const fixturesPath = path.join(__dirname, 'fixtures');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/test');
// mongoose.set('debug', true);

co(async function () {

  await clearDatabase();

  let fixtures = require('fs').readdirSync(fixturesPath);

  /* ВАШ КОД для параллельной вставки всех фикстур */

}).catch(console.error).then(() => mongoose.disconnect());
