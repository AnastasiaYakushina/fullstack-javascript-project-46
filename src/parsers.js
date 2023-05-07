import * as yaml from 'node:js-yaml';
import * as fs from 'node:fs';
import * as path from 'node:path';

const parseJSON = (filepath) => JSON.parse(fs.readFileSync(path.resolve(filepath)));

const parseYAML = (filepath) => yaml.load(fs.readFileSync(path.resolve(filepath)));

const parse = (filepath) => {
  if (path.extname(filepath) === '.json') {
    return parseJSON(filepath);
  }
  if ((path.extname(filepath) === '.yml') || (path.extname(filepath) === 'yaml')) {
    return parseYAML(filepath);
  }
  return 'the format is not defined';
};

export default parse;
