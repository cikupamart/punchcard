import test from 'ava';
import config from 'config';
import _ from 'lodash';

import utils from '../lib/content/utils';
import futils from './fixtures/_utils';

/**
 * Checks a file's value as it is saved in the db
 *
 * @param  {object} t - ava test
 * @param  {object} value - a file input's value as it would be saved in the db
 */
const valcheck = (t, value) => {
  t.is(typeof value, 'object', 'database file value should be an object');
  t.is(typeof value.path, 'string', 'database value should contain a path string');
  t.true(_.includes(value.path, config.storage.public), 'database value should contain the storage prefix');
  t.is(typeof value.type, 'string', 'database value should contain a type string');
  t.is(typeof value.original, 'string', 'database value should contain an original filename string');
  t.is(typeof value.relative, 'string', 'database value should contain a relative path as a string');
};

//////////////////////////////
// Utils - file inputs
//////////////////////////////
test('fileinputs - no input should return array', t => {
  const result = utils.fileinputs();

  t.true(Array.isArray(result), 'should return an array');
  t.is(result.length, 0, 'should return an empty array');
});

test('fileinputs - get file inputs', t => {
  const type = futils.type('fileinputs');
  const result = utils.fileinputs(type.attributes);

  t.true(Array.isArray(result), 'should return an array');
  t.is(result.length, 4, 'should have all file inputs');

  t.is(typeof result[0], 'object', 'file input desc should be an object');
  t.is(result[0].attr, 'fileinputs-file-single', 'should know 1st attribute\'s id');
  t.is(result[0].input, 'filesingle', 'should know 1st attribute\'s input id');
  t.is(result[0].type, 'file', 'should know 1st attribute\'s input type');
  t.is(typeof result[1], 'object', 'file input desc should be an object');
  t.is(result[1].attr, 'fileinputs-file-repeating', 'should know 2nd attribute\'s id');
  t.is(result[1].input, 'filerepeater', 'should know 2nd attribute\'s input id');
  t.is(result[1].type, 'file', 'should know 2nd attribute\'s input type');
  t.is(typeof result[2], 'object', 'file input desc should be an object');
  t.is(result[2].attr, 'fileinputs-file-multiple', 'should know 3rd attribute\'s id');
  t.is(result[2].input, 'filemulti1', 'should know 3rd attribute\'s input id');
  t.is(result[2].type, 'file', 'should know 3rd attribute\'s input type');
  t.is(typeof result[3], 'object', 'file input desc should be an object');
  t.is(result[3].attr, 'fileinputs-file-multiple', 'should know 4th attribute\'s id');
  t.is(result[3].input, 'filemulti2', 'should know 4th attribute\'s input id');
  t.is(result[3].type, 'file', 'should know 4th attribute\'s input type');
});

//////////////////////////////
// Utils - file paths
//////////////////////////////
test('filepaths - returns second param unchanged if first param empty or not array', t => {
  const result = utils.filepaths('', 'foo');

  t.is(result, 'foo', 'should return 2nd param');

  const result2 = utils.filepaths('bar', 'foo');

  t.is(result2, 'foo', 'should return 2nd param');

  const result3 = utils.filepaths([], 'foo');

  t.is(result3, 'foo', 'should return 2nd param');
});

test('filepaths - convert file values to add absolute', t => {
  const type = futils.type('fileinputs');
  const fileinputs = utils.fileinputs(type.attributes);
  const result = utils.filepaths(fileinputs, futils.values('fileinputs'));

  t.is(typeof result['fileinputs-file-single'], 'object', 'file-single input should be an object');
  t.is(typeof result['fileinputs-file-single'].filesingle, 'object', 'file-single input should contain an input object');
  valcheck(t, result['fileinputs-file-single'].filesingle.value);

  t.true(Array.isArray(result['fileinputs-file-repeating']), 'file-repeating should be an array');
  result['fileinputs-file-repeating'].forEach(input => {
    Object.keys(input).forEach(key => {
      if (input[key].hasOwnProperty('value')) {
        valcheck(t, input[key].value);
      }
    });
  });

  t.is(typeof result['fileinputs-file-multiple'], 'object', 'file-multiple input should be an object');
  const multis = result['fileinputs-file-multiple'];

  t.is(Object.keys(multis).length, 2, 'should contain two inputs');
  Object.keys(multis).forEach(input => {
    valcheck(t, multis[input].value);
  });
});


//////////////////////////////
// Utils - file hold
//////////////////////////////
test('filehold - returns second param unchanged if first param empty or not array, 3rd param not an object', t => {
  const result = utils.filehold('', 'foo');
  t.is(result, 'foo', 'should return 2nd param');

  const result2 = utils.filehold('bar', 'foo');
  t.is(result2, 'foo', 'should return 2nd param');

  const result3 = utils.filehold([], 'foo', 'bar');
  t.is(result3, 'foo', 'should return 2nd param');
});

test('filehold - returns value with files added', t => {
  t.pass('coming soon!');
});
