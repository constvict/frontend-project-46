import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJSON from './json.js';

const formatDiff = (diffTree, formatter) => {
  if (formatter === 'stylish') {
    return formatStylish(diffTree);
  }
  if (formatter === 'plain') {
    return formatPlain(diffTree);
  }
  if (formatter === 'json') {
    return formatJSON(diffTree);
  }
  throw new Error(`Unsupported format - ${formatter}. Please select a supported option.`);
};

export default formatDiff;
