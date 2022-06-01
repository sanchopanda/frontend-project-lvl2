import _ from 'lodash';
import parser from './parser.js';

const getValue = (data, deep) => {
  if (typeof data === 'object' && data !== null) {
    const finishSpace = `${'  '.repeat(deep)}  `;
    const nextDeep = deep + 2;
    const space = `${'  '.repeat(nextDeep)}  `;
    const keys = Object.keys(data);
    const temp = keys.reduce((prev, key) => {
      prev.push(`${space}${key}: ${getValue(data[key], nextDeep)}`);
      return prev;
    }, []);
    return `{\n${temp.join('\n')}\n${finishSpace}}`;
  }
  return `${data}`;
};

const findDiff = (data1, data2, deep = 1) => {
  const keys = _.uniq([...Object.keys(data1), ...Object.keys(data2)]).sort();

  const diffArrays = keys.reduce((prev, key) => {
    const result = [];
    const space = `${'  '.repeat(deep)}`;

    if (!data2.hasOwnProperty(key)) {
      result.push(`${space}- ${key}: ${getValue(data1[key], deep)}`);
    } else if (!data1.hasOwnProperty(key)) {
      result.push(`${space}+ ${key}: ${getValue(data2[key], deep)}`);
    } else if ((typeof data1[key] === 'object' && data1[key] !== 'null') && (typeof data2[key] === 'object' && data2[key] !== 'null')) {
      result.push(
        `${space}  ${key}: {\n${findDiff(data1[key], data2[key], deep + 2)}\n${space}  }`,
      );
    } else if (data1[key] !== data2[key]) {
      result.push(`${space}- ${key}: ${getValue(data1[key], deep)}`);
      result.push(`${space}+ ${key}: ${getValue(data2[key], deep)}`);
    } else {
      result.push(`${space}  ${key}: ${getValue(data1[key], deep)}`);
    }

    return [...prev, ...result];
  }, []);

  return diffArrays.join('\n');
};

export default (filepath1, filepath2) => {
  const data1 = parser(filepath1);
  const data2 = parser(filepath2);

  return `{\n${findDiff(data1, data2)}\n}`;
};
