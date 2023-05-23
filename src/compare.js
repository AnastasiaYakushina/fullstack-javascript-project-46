import _ from 'lodash';
import parse from './parsers.js';
import formatter from '../formatters/index.js';

const getCompareArr = (fileOne, fileTwo) => {
  const mergedObject = { ...fileOne, ...fileTwo };
  const arrOf = Object.entries(mergedObject);
  const sortedArr = _.sortBy(arrOf);
  const result = sortedArr.map(([key, value]) => {
    const obj = {};
    obj.name = key;
    if (!Object.hasOwn(fileOne, key)) {
      obj.value = _.cloneDeep(value);
      obj.diff = 'added';
    } else if (!Object.hasOwn(fileTwo, key)) {
      obj.value = _.cloneDeep(value);
      obj.diff = 'deleted';
    } else if ((typeof value !== 'object' || value === null) || (typeof fileOne[key] !== 'object')) {
      obj.value = value;
      if (fileOne[key] === fileTwo[key]) {
        obj.diff = 'unchanged';
      } else {
        obj.oldValue = _.cloneDeep(fileOne[key]);
        obj.diff = 'changed';
      }
    } else {
      obj.value = getCompareArr(_.cloneDeep(fileOne[key]), _.cloneDeep(fileTwo[key]));
      obj.diff = 'changed';
    }
    return obj;
  });
  return result;
};

const genDiff = (filepath1, filepath2, type) => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);
  return formatter(getCompareArr(file1, file2), type);
};

export default genDiff;
