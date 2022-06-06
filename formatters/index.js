import getJson from './json.js';
import getPlain from './plain.js';
import getStylish from './stylish.js';

export default (tree, formater = false) => {
  if (formater === 'plain') return getPlain(tree);
  if (formater === 'json') return getJson(tree);
  return getStylish(tree);
};
