import { readFileSync } from 'fs';
import _ from 'lodash';

export default (filepath1, filepath2) => {
  const data1 = JSON.parse(readFileSync(filepath1));
  const data2 = JSON.parse(readFileSync(filepath2));

  const keys = _.uniq([...Object.keys(data1), ...Object.keys(data2)]);

  const diffs = keys.reduce((prev, key) => {
    if (!data1.hasOwnProperty(key)) return;
  }, {});

 
};
