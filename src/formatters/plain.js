import _ from 'lodash';

const stringify = (value) => {
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

    switch (node.type) {
      case 'added':
        return `Property '${propertyPath}' was added with value: ${stringify(node.value)}`;
      case 'removed':
        return `Property '${propertyPath}' was removed`;
      case 'modified':
        return `Property '${propertyPath}' was updated. From ${stringify(node.dataValue1)} to ${stringify(node.dataValue2)}`;
      default:
        return formatPlain(node.children, updatedPath);
    }
  };

  return diffTree
    .filter(({ type }) => type !== 'equal')
    .flatMap(formatNode)
    .join('\n');
};

export default formatPlain;
