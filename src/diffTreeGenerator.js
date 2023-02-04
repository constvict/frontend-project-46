import _ from 'lodash';

const getDiffTree = (data1, data2) => {
  const sortedKeys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  return sortedKeys.map((key) => {
    let diffTree = {};
    if (!Object.hasOwn(data1, key)) {
      diffTree = { type: 'added', key, value: data2[key] };
    } else if (!Object.hasOwn(data2, key)) {
      diffTree = { type: 'removed', key, value: data1[key] };
    } else if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      diffTree = { type: 'nested', key, children: getDiffTree(data1[key], data2[key]) };
    } else if (_.isEqual(data1[key], data2[key])) {
      diffTree = { type: 'equal', key, value: data1[key] };
    } else {
      diffTree = {
        type: 'modified', key, dataValue1: data1[key], dataValue2: data2[key],
      };
    }
    return diffTree;
  });
};

export default getDiffTree;
