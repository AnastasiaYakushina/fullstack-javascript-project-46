import * as fs from 'node:fs';
import * as path from 'node:path';

const parseJSON = (filepath) => JSON.parse(fs.readFileSync(path.resolve(filepath)));

const parse = (filepath) => {
  if (path.extname(filepath) === '.json') {
    return parseJSON(filepath);
  }
  return 'the format is not defined';
};

export default parse;
