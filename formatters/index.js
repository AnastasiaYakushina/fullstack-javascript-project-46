import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (result, type) => {
  if (type === 'plain') {
    return plain(result);
  }
  return stylish(result);
};

export default formatter;
