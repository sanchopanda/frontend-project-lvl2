import _ from 'lodash';

const buildDiff = (data1, data2Arg = false) => {
  if (!_.isObject(data1)) return data1;

  const data2 = data2Arg || data1;

  const keys = _.uniq([...Object.keys(data1), ...Object.keys(data2)]).sort();

  return keys.map((key) => {
    if (!data1.hasOwnProperty(key)) {
      return {
        name: key,
        value: buildDiff(data2[key]),
        type: '+',
      };
    }

    if (!data2.hasOwnProperty(key)) {
      return {
        name: key,
        value: buildDiff(data1[key]),
        type: '-',
      };
    }

    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        name: key,
        value: buildDiff(data1[key], data2[key]),
        type: 'object',
      };
    }

    if (data1[key] === data2[key]) {
      return {
        name: key,
        value: data1[key],
        type: '=',
      };
    }

    return [
      {
        name: key,
        value: buildDiff(data1[key]),
        type: '-',
      },
      {
        name: key,
        value: buildDiff(data2[key]),
        type: '+',
      },
    ];
  });
};

export default buildDiff;
