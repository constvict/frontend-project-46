import fs from 'fs';
import path from 'path';
import compare from './compare.js';
import parseFormat from './parsers.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getData = (absolutePath) => fs.readFileSync(absolutePath);
const getFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2) => {
  const absolutePathFile1 = getAbsolutePath(filepath1);
  const absolutePathFile2 = getAbsolutePath(filepath2);
  const file1 = parseFormat(getData(absolutePathFile1), getFormat(absolutePathFile1));
  const file2 = parseFormat(getData(absolutePathFile2), getFormat(absolutePathFile2));
  return compare(file1, file2);
};

export default genDiff;
