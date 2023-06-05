import _ from 'lodash';
import parse from './parsers.js';
import formatter from '../formatters/index.js';

const getCompareArr = (fileOne, fileTwo) => {
  const mergedObject = { ...fileOne, ...fileTwo };
  const arrOf = Object.entries(mergedObject);
  const sortedArr = _.sortBy(arrOf);
  const result = sortedArr.map(([key, value]) => {
    if (!Object.hasOwn(fileOne, key)) {
      return { name: key, value: _.cloneDeep(value), diff: 'added' };
    } if (!Object.hasOwn(fileTwo, key)) {
      return { name: key, value: _.cloneDeep(value), diff: 'deleted' };
    } if ((typeof value !== 'object' || value === null) || (typeof fileOne[key] !== 'object')) {
      if (fileOne[key] === fileTwo[key]) {
        return { name: key, value, diff: 'unchanged' };
      }
      return {
        name: key, value, oldValue: _.cloneDeep(fileOne[key]), diff: 'changed',
      };
    }
    return { name: key, value: getCompareArr(_.cloneDeep(fileOne[key]), _.cloneDeep(fileTwo[key])), diff: 'changed' };
  });
  return result;
};

const genDiff = (filepath1, filepath2, type) => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);
  return formatter(getCompareArr(file1, file2), type);
};

export default genDiff;
