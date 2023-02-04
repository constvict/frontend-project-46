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
  const formatNode = (node, depth) => node.map((data) => {
    switch (data.type) {
      case 'nested':
        return `${indent(depth)}  ${data.key}: {\n${formatNode(data.children, depth + 1).join('\n')}\n${indent(depth)}  }`;
      case 'added':
        return `${indent(depth)}+ ${data.key}: ${stringify(data.value, depth)}`;
      case 'removed':
        return `${indent(depth)}- ${data.key}: ${stringify(data.value, depth)}`;
      case 'modified':
        return (
          `${indent(depth)}- ${data.key}: ${stringify(data.dataValue1, depth)}\n`
          + `${indent(depth)}+ ${data.key}: ${stringify(data.dataValue2, depth)}`
        );
      case 'equal':
        return `${indent(depth)}  ${data.key}: ${stringify(data.value, depth)}`;
      default:
        throw new Error(`Invalid type name: ${data.type}`);
    }
  });

  return `{\n${formatNode(diffTree, 1).join('\n')}\n}`;
};

export default formatStylish;
