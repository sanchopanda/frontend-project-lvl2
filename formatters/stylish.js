import _ from 'lodash';

const space = '  ';

const getStylish = (tree, deep = 1) => {
  const indent = space.repeat(deep);
  const finishIndent = space.repeat(deep - 1);

  const temp = tree.flat().map((item) => {
    const { name, type } = item;
    const value = _.isArray(item.value) ? getStylish(item.value, deep + 2) : item.value;
    let sign;

    switch (type) {
      case 'added':
        sign = '+ ';
        break;
      case 'removed':
        sign = '- ';
        break;
      case 'nested':
        sign = '  ';
        break;
      case 'equal':
        sign = '  ';
        break;
      default:
        sign = '  ';
        break;
    }

    return `${indent}${sign}${name}: ${value}`;
  });

  return `{\n${temp.join('\n')}\n${finishIndent}}`;
};

export default getStylish;
