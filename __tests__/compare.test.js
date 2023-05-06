import path from 'path';
import compare from '../src/compare.js';

let file1;
let file2;

beforeAll(() => {
  file1 = path.resolve('../fullstack-javascript-project-46/__fixtures__/file1.json');
  file2 = path.resolve('../fullstack-javascript-project-46/__fixtures__/file2.json');
});

const result = '{\n- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';

test('compare', () => {
  expect(compare(file1, file2)).toEqual(result);
});
