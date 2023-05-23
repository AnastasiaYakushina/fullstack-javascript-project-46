const formatValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (differences) => {
  const iter = (data, name) => {
    const result = data.flatMap((node) => {
      const first = (Array.isArray(node.value)) ? `${node.name}.` : node.name;
      const property = `Property '${name}${first}'`;
      if (node.diff === 'deleted') {
        return `${property} was removed`;
      } if (node.diff === 'added') {
        return `${property} was added with value: ${formatValue(node.value)}`;
      } if (node.diff === 'unchanged') {
        return [];
      } if (Array.isArray(node.value)) {
        return iter(node.value, `${name}${first}`);
      }
      return `${property} was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.value)}`;
    });
    return [...result].join('\n');
  };
  return iter(differences, '');
};

export default plain;
