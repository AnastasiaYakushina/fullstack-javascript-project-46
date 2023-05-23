import * as path from 'node:path';
import * as fs from 'node:fs';
import { fileURLToPath } from 'url';
import compare from '../src/compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const stylishRes = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');
const plainRes = fs.readFileSync(getFixturePath('plain_result.txt'), 'utf-8');
const jsonRes = fs.readFileSync(getFixturePath('json_result.json'), 'utf-8');

const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');

const yamlFile1 = getFixturePath('file1.yml');
const yamlFile2 = getFixturePath('file2.yml');

test('compare JSON - stylish', () => {
  expect(compare(jsonFile1, jsonFile2)).toEqual(stylishRes);
});

test('compare YAML - stylish', () => {
  expect(compare(yamlFile1, yamlFile2)).toEqual(stylishRes);
});

test('compare JSON - plain', () => {
  expect(compare(jsonFile1, jsonFile2, 'plain')).toEqual(plainRes);
});

test('compare YAML - plain', () => {
  expect(compare(yamlFile1, yamlFile2, 'plain')).toEqual(plainRes);
});

test('compare JSON - json', () => {
  expect(compare(jsonFile1, jsonFile2, 'json')).toEqual(jsonRes);
});

test('compare YAML - json', () => {
  expect(compare(yamlFile1, yamlFile2, 'json')).toEqual(jsonRes);
});
