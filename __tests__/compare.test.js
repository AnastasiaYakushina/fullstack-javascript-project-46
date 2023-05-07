import * as path from 'node:path';
import { fileURLToPath } from 'url';
import compare from '../src/compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let jsonFile1;
let jsonFile2;

beforeAll(() => {
  jsonFile1 = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  jsonFile2 = path.join(__dirname, '..', '__fixtures__', 'file2.json');
});

let yamlFile1;
let yamlFile2;

beforeAll(() => {
  yamlFile1 = path.join(__dirname, '..', '__fixtures__', 'file1.yml');
  yamlFile2 = path.join(__dirname, '..', '__fixtures__', 'file2.yml');
});

const result = '{\n- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';

test('compare JSON', () => {
  expect(compare(jsonFile1, jsonFile2)).toEqual(result);
});

test('compare YAML', () => {
  expect(compare(yamlFile1, yamlFile2)).toEqual(result);
});
