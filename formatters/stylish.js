import _ from 'lodash';

const getName = (name, diff, oldValue) => {
  if ((diff === 'added') || ((diff === 'changed') && (oldValue !== undefined))) {
    return `  + ${name}`;
  } if (diff === 'deleted') {
    return `  - ${name}`;
  }
  return `    ${name}`;
};

const modification = (differences) => {
  const obj = {};
  differences.map((node) => {
    const nameOf = getName(node.name, node.diff, node.oldValue);
    if (Object.hasOwn(node, 'oldValue')) {
      const oldName = `  - ${node.name}`;
      obj[oldName] = _.cloneDeep(node.oldValue);
    }
    if (Array.isArray(node.value)) {
      obj[nameOf] = modification(node.value);
    } else {
      obj[nameOf] = _.cloneDeep(node.value);
    }
    return obj;
  });
  return obj;
};

const makeString = (item) => String(item);

const stringify = (tree, replacer = '    ') => {
  const iter = (data, depth) => {
    if (typeof (data) !== 'object' || data === null) {
      return makeString(data);
    }
    const arr = Object.entries(data);
    const str = arr.reduce((acc, [key, value]) => {
      const indent = (key.startsWith(' ')) ? (replacer.repeat(depth - 1)) : replacer.repeat(depth);
      let newAcc = acc;
      newAcc += `${indent}${makeString(key)}: ${iter(value, depth + 1)}\n`;
      return newAcc;
    }, '');
    return `{\n${str}${replacer.repeat(depth - 1)}}`;
  };
  return iter(tree, 1);
};

const stylish = (differences) => stringify(modification(differences));

export default stylish;
