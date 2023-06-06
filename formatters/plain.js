import _ from 'lodash';

const formatValue = (value) => { // форматируем значение: если объект/строка/иное
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return (typeof value === 'string') ? `'${value}'` : value;
};

const plain = (differences) => {
  const iter = (data, pathOfName) => {
    const result = data
      .filter((node) => node.diff !== 'unchanged') // исключаем значения без изменений
      .map((node) => {
        const currentPathOfName = [...pathOfName, node.name]; // строим путь к свойству
        const property = `Property '${currentPathOfName.join('.')}'`;
        if (node.diff === 'deleted') {
          return `${property} was removed`;
        } if (node.diff === 'added') {
          return `${property} was added with value: ${formatValue(node.value)}`;
        } if (!Array.isArray(node.value)) {
          return `${property} was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.value)}`;
        }
        return iter(node.value, currentPathOfName);
      });
    return result.join('\n');
  };
  return iter(differences, '');
};

export default plain;
