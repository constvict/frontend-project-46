import _ from 'lodash';

const getDiffTree = (objectA, objectB) => {
  const sortedKeys = _.sortBy(_.union(_.keys(objectA), _.keys(objectB)));
  return sortedKeys.map((key) => {
    if (!Object.hasOwn(objectA, key)) {
      return { status: 'added', key, value: objectB[key] };
    }
    if (!Object.hasOwn(objectB, key)) {
      return { status: 'deleted', key, value: objectA[key] };
    }
    if (_.isPlainObject(objectA[key]) && _.isPlainObject(objectB[key])) {
      return { status: 'nested', key, children: getDiffTree(objectA[key], objectB[key]) };
    }
    if (objectA[key] === objectB[key]) {
      return { status: 'unchanged', key, value: objectA[key] };
    }
    return {
      status: 'changed', key, fromValue: objectA[key], toValue: objectB[key],
    };
  });
};

export default getDiffTree;
