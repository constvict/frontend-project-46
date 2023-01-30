import stylish from './stylish.js';

const formatDiff = (diffTree, format) => {
  if (format === 'stylish') {
    return stylish(diffTree);
  }
  throw new Error(`Unsupported format - ${format}. Please select a supported option.`);
};

export default formatDiff;
