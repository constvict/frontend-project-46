import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJSON from './json.js';

const formatDiff = (diffTree, formatName) => {
  if (formatName === 'stylish') {
    return formatStylish(diffTree);
  }
  if (formatName === 'plain') {
    return formatPlain(diffTree);
  }
  if (formatName === 'json') {
    return formatJSON(diffTree);
  }
  throw new Error(`Unsupported format - ${formatName}. Please select a supported option.`);
};

export default formatDiff;
