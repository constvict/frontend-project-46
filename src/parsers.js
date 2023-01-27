import yaml from 'js-yaml';

const parseFormat = (data, format) => {
  if (format === 'yml' || format === 'yaml') {
    return yaml.load(data);
  }
  if (format === 'json') {
    return JSON.parse(data);
  }
  throw new Error(`Unsupported file format: .${format}\nSupported file formats: .json .yaml .yml`);
};

export default parseFormat;
