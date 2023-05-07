import parse from './parsers.js';

const compare = (filepath1, filepath2) => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);
  const mergedObject = { ...file1, ...file2 };
  const keys = Object.keys(mergedObject);
  const sortedKeys = keys.sort();
  const result = sortedKeys.reduce((acc, key) => {
    let newAcc = acc;
    if (!Object.hasOwn(file1, key)) {
      newAcc += `+ ${key}: ${file2[key]}\n`;
    } else if (!Object.hasOwn(file2, key)) {
      newAcc += `- ${key}: ${file1[key]}\n`;
    } else if (file1[key] === file2[key]) {
      newAcc += `  ${key}: ${file1[key]}\n`;
    } else {
      newAcc += `- ${key}: ${file1[key]}\n+ ${key}: ${file2[key]}\n`;
    }
    return newAcc;
  }, '');
  return `{\n${result}}`;
};

export default compare;
