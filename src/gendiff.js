import _ from 'lodash';
import parser from './parser.js';

export default (filepath1, filepath2) => {
  const data1 = parser(filepath1);
  const data2 = parser(filepath2);

  console.log(data1, data2)

  const keys = _.uniq([...Object.keys(data1), ...Object.keys(data2)]).sort();

  const diffArrays = keys.reduce((prev, key) => {
    const result = [];
    if (!data2.hasOwnProperty(key)) {
      result.push(`- ${key}: ${data1[key]}`);
    } else if (!data1.hasOwnProperty(key)) {
      result.push(`+ ${key}: ${data2[key]}`);
    } else if (data1[key] !== data2[key]) {
      result.push(`- ${key}: ${data1[key]}`);
      result.push(`+ ${key}: ${data2[key]}`);
    } else {
      result.push(`  ${key}: ${data1[key]}`);
    }

    return [...prev, ...result];
  }, []);

  return diffArrays.join('\n');
};
