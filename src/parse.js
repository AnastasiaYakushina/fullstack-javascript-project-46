import path from "path";
import fs from "fs";


const parseJSON = (filepath) => JSON.parse(fs.readFileSync(path.resolve(filepath)));

const parse = (filepath) => {
  if (path.extname(filepath) === '.json') {
    return parseJSON(filepath);
  }
};

export default parse;