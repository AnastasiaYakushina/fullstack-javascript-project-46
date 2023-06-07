import _ from 'lodash';

// преобразование имени ключа в `${знак изменения}${имя ключа}`
const getName = (name, diff, item) => {
  if ((diff === 'added') || ((diff === 'changed') && (Object.hasOwn(item, 'oldValue')))) {
    return `  + ${name}`;
  } if (diff === 'deleted') {
    return `  - ${name}`;
  }
  return `    ${name}`;
};

// преобразование массива изменений в объект, где ключ: `${знак изменения}${имя ключа}`
const getObjectDiff = (arrOfDiff) => {
  const result = arrOfDiff.reduce((acc, item) => {
    const nameOf = getName(item.name, item.diff, item);
    const newAcc = acc;
    if (Object.hasOwn(item, 'oldValue')) {
      const oldName = `  - ${item.name}`;
      if (Array.isArray(item.value)) {
        return {
          ...newAcc, [oldName]: item.oldValue, [nameOf]: getObjectDiff(item.value),
        };
      }
      return {
        ...newAcc, [oldName]: item.oldValue, [nameOf]: item.value,
      };
    } if (Array.isArray(item.value)) {
      return {
        ...newAcc, [nameOf]: getObjectDiff(item.value),
      };
    }
    return {
      ...newAcc, [nameOf]: item.value,
    };
  }, {});
  return result;
};

const stringify = (objectDiff, replacer = '    ') => {
  const iter = (data, depth) => {
    if (!_.isObject(data)) {
      return `${data}`;
    }
    const arr = Object.entries(data);
    const str = arr.reduce((acc, [key, value]) => {
      const indent = (key.startsWith(' ')) ? (replacer.repeat(depth - 1)) : replacer.repeat(depth);
      const newAcc = `${acc}${indent}${key}: ${iter(value, depth + 1)}\n`;
      return newAcc;
    }, '');
    return `{\n${str}${replacer.repeat(depth - 1)}}`;
  };
  return iter(objectDiff, 1);
};

const stylish = (arrOfDiff) => stringify(getObjectDiff(arrOfDiff));

export default stylish;
