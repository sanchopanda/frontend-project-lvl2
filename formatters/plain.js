import _ from 'lodash';

const normalizer = (value) => {
  if (_.isArray(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return value;
};

const getPlain = (tree, parent = false) => {
  const temp = tree.map((item) => {
    if (_.isArray(item)) {
      const [item1, item2] = item;
      const { name } = item1;
      const path = `${parent ? `${parent}.` : ''}${name}`;
      const value1 = normalizer(item1.value);
      const value2 = normalizer(item2.value);

      return `Property '${path}' was updated. From ${value1} to ${value2}`;
    }

    const { name, type, value } = item;

    const path = `${parent ? `${parent}.` : ''}${name}`;

    switch (type) {
      case 'nested':
        return getPlain(value, path);
      case 'added':
        return `Property '${path}' was added with value: ${normalizer(value)}`;
      case 'removed':
        return `Property '${path}' was removed`;
      case 'equal':
        return [];
      default:
        return [];
    }
  });

  return temp.flat().join('\n');
};

export default getPlain;
