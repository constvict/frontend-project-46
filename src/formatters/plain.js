import _ from 'lodash';

const stringifyObjectValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const formatPlain = (diffTree, currentPath = []) => {
  const formatNode = (node) => {
    const updatedPath = currentPath.concat(node.key);
    const propertyPath = updatedPath.join('.');

    switch (node.status) {
      case 'added':
        return `Property '${propertyPath}' was added with value: ${stringifyObjectValue(node.value)}`;
      case 'deleted':
        return `Property '${propertyPath}' was removed`;
      case 'changed':
        return `Property '${propertyPath}' was updated. From ${stringifyObjectValue(node.fromValue)} to ${stringifyObjectValue(node.toValue)}`;
      default:
        return formatPlain(node.children, updatedPath);
    }
  };

  return diffTree
    .filter(({ status }) => status !== 'unchanged')
    .flatMap(formatNode)
    .join('\n');
};

export default formatPlain;
