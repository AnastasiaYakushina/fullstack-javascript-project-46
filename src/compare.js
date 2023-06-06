import _ from 'lodash';
import parse from './parsers.js';
import formatter from '../formatters/index.js';

const getArrOfDiff = (object1, object2) => {
  const mergedObject = { ...object1, ...object2 }; // объединяем объекты
  const sortedArrOfKey = _.sortBy(Object.keys(mergedObject)); // формируем и сортируем массив ключей
  return sortedArrOfKey.map((key) => {
    const value1 = object1[key];
    const value2 = object2[key];
    if (!Object.hasOwn(object1, key)) { // добавлено
      return {
        name: key, value: value2, diff: 'added',
      };
    } if (!Object.hasOwn(object2, key)) { // удалено
      return {
        name: key, value: value1, diff: 'deleted',
      };
    } if (object1[key] === object2[key]) { // изменений нет
      return {
        name: key, value: value1, diff: 'unchanged',
      };
    } if (!_.isPlainObject(object1[key]) || !_.isPlainObject(object2[key])) { // изменено
      return {
        name: key, value: value2, oldValue: value1, diff: 'changed',
      };
    }
    return {
      name: key, value: getArrOfDiff(value1, value2), diff: 'changed',
    };
  });
};

const genDiff = (filepath1, filepath2, type) => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);
  return formatter(getArrOfDiff(file1, file2), type);
};

export default genDiff;
