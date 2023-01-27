import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('compare two flat json()', () => {
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const excpectedResult = readFile('expected.txt');
  expect(result).toEqual(excpectedResult);
});

test('compare two flat yaml()', () => {
  const result = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'));
  const excpectedResult = readFile('expected.txt');
  expect(result).toEqual(excpectedResult);
});

test('compare unsupported format()', () => {
  const result = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.txt'));
  const excpectedResult = readFile('expected.txt');
  expect(result).toEqual(excpectedResult);
});
