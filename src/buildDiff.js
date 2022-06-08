import _ from 'lodash';

const buildDiff = (data1, data2Arg = false) => {
  if (!_.isObject(data1)) return data1;

  const data2 = data2Arg || data1;

  const keys = _.sortBy(_.uniq([...Object.keys(data1), ...Object.keys(data2)]));

  return keys.map((key) => {
    if (!_.has(data1, key)) {
      return {
        name: key,
        value: buildDiff(data2[key]),
        type: 'added',
      };
    }

    if (!_.has(data2, key)) {
      return {
        name: key,
        value: buildDiff(data1[key]),
        type: 'removed',
      };
    }

    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        name: key,
        value: buildDiff(data1[key], data2[key]),
        type: 'nested',
      };
    }

    if (data1[key] === data2[key]) {
      return {
        name: key,
        value: data1[key],
        type: 'equal',
      };
    }

    return [
      {
        name: key,
        value: buildDiff(data1[key]),
        type: 'removed',
      },
      {
        name: key,
        value: buildDiff(data2[key]),
        type: 'added',
      },
    ];
  });
};

export default buildDiff;
