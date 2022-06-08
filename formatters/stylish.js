import _ from 'lodash';

const space = '  ';

const getSign = (type) => {
  switch (type) {
    case 'added':
      return '+ ';
    case 'removed':
      return '- ';
    case 'nested':
      return '  ';
    case 'equal':
      return '  ';
    default:
      return '  ';
  }
};

const getStylish = (tree, deep = 1) => {
  const indent = space.repeat(deep);
  const finishIndent = space.repeat(deep - 1);

  const temp = tree.flat().map((item) => {
    const { name, type } = item;
    const value = _.isArray(item.value) ? getStylish(item.value, deep + 2) : item.value;
    const sign = getSign(type);

    return `${indent}${sign}${name}: ${value}`;
  });

  return `{\n${temp.join('\n')}\n${finishIndent}}`;
};

export default getStylish;
