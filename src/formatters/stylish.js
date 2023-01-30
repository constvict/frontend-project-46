import _ from 'lodash';

const indent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return `${value}`;
  }

  const entries = Object.entries(value);
  const lines = entries.map(([key, val]) => (
    `${indent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`
  )).join('\n');

  return `{\n${lines}\n${indent(depth)}  }`;
};

const formatStylish = (diffTree) => {
  const formatNode = (node, depth) => node.map(({
    status, key, value, fromValue, toValue, children,
  }) => {
    switch (status) {
      case 'nested':
        return `${indent(depth)}  ${key}: {\n${formatNode(children, depth + 1).join('\n')}\n${indent(depth)}  }`;
      case 'added':
        return `${indent(depth)}+ ${key}: ${stringify(value, depth)}`;
      case 'deleted':
        return `${indent(depth)}- ${key}: ${stringify(value, depth)}`;
      case 'changed':
        return (
          `${indent(depth)}- ${key}: ${stringify(fromValue, depth)}\n`
          + `${indent(depth)}+ ${key}: ${stringify(toValue, depth)}`
        );
      case 'unchanged':
        return `${indent(depth)}  ${key}: ${stringify(value, depth)}`;
      default:
        throw new Error(`Invalid status name: ${status}`);
    }
  });

  return `{\n${formatNode(diffTree, 1).join('\n')}\n}`;
};

export default formatStylish;
