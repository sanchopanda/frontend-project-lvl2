import buildDiff from './buildDiff.js';
import parser from './parser.js';
import formatters from '../formatters/index.js';

export default (filepath1, filepath2, formater = 'stylish') => {
  const data1 = parser(filepath1);
  const data2 = parser(filepath2);

  const diffs = buildDiff(data1, data2);

  return formatters(diffs, formater);
};
