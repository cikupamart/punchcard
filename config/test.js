'use strict';

const path = require('path');

let knex = {};

if (process.env.CI === 'true') {
  knex = {
    dialect: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      database: 'travis_ci_test',
    },
    debug: false,
  };
}
else {
  knex = {
    dialect: 'pg',
    connection: {
      host: 'localhost',
      user: 'punchcard',
      database: 'punchcard_test',
    },
    debug: false,
  };
}

module.exports = {
  content: {
    directory: path.join(__dirname, '../tests/fixtures/content-types/good'),
  },
  knex,
  workflows: {
    directory: path.join(__dirname, '../tests/fixtures/workflows/good'),
  },
  storage: {
    dest: 'tests/public/files',
    temp: {
      dest: 'tests/public/tmp/',
    },
  },
};
