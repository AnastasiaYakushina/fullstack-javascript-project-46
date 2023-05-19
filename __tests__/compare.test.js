import * as path from 'node:path';
import * as fs from 'node:fs';
import { fileURLToPath } from 'url';
import compare from '../src/compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let result;

beforeAll(() => {
  result = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');
});

let jsonFile1;
let jsonFile2;

beforeAll(() => {
  jsonFile1 = getFixturePath('file1.json');
  jsonFile2 = getFixturePath('file2.json');
});

let yamlFile1;
let yamlFile2;

beforeAll(() => {
  yamlFile1 = getFixturePath('file1.yml');
  yamlFile2 = getFixturePath('file2.yml');
});

test('compare JSON', () => {
  expect(compare(jsonFile1, jsonFile2)).toEqual(result);
});

test('compare YAML', () => {
  expect(compare(yamlFile1, yamlFile2)).toEqual(result);
});
