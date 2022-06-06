import getPlain from './plain.js';
import getStylish from './stylish.js';

export default (tree, formater = false) => {
  if (formater === 'plain') return getPlain(tree);
  return getStylish(tree);
};
