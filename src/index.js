import fs from 'fs';
import path from 'path';
import getDiffTree from './diffTreeGenerator.js';
import getParsedData from './parsers.js';
import formatDiff from './formatters/index.js';

const getAbsoluteFilePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFileData = (absolutePath) => fs.readFileSync(absolutePath, 'utf-8');
const getFileFormat = (filepath) => path.extname(filepath).slice(1).toLowerCase();

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const absoluteFilePath1 = getAbsoluteFilePath(filepath1);
  const absoluteFilePath2 = getAbsoluteFilePath(filepath2);
  const data1 = getParsedData(readFileData(absoluteFilePath1), getFileFormat(absoluteFilePath1));
  const data2 = getParsedData(readFileData(absoluteFilePath2), getFileFormat(absoluteFilePath2));
  const diffTree = getDiffTree(data1, data2);
  return formatDiff(diffTree, formatter);
};

export default genDiff;
