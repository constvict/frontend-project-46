import stylish from './stylish.js';
import plain from './plain.js';

const formatDiff = (diffTree, formatName) => {
  if (formatName === 'stylish') {
    return stylish(diffTree);
  }
  if (formatName === 'plain') {
    return plain(diffTree);
  }
  throw new Error(`Unsupported format - ${formatName}. Please select a supported option.`);
};

export default formatDiff;
