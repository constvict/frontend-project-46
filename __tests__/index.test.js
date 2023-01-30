import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index';
import getParsedData from '../src/parsers';
import formatDiff from '../src/formatters';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
const excpectedResultStylish = readFile('stylishExpected.txt');
const excpectedResultPlain = readFile('plainExpected.txt');
const excpectedResultJson = readFile('jsonExpected.txt');

test('compare two flat json()', () => {
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(result).toEqual(excpectedResultStylish);
});

test('compare two flat yaml()', () => {
  const result = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'));
  expect(result).toEqual(excpectedResultStylish);
});

test('compare two flat json with plain format option()', () => {
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(result).toEqual(excpectedResultPlain);
});

test('compare two flat yaml with json format option()', () => {
  const result = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'json');
  expect(result).toEqual(excpectedResultJson);
});

test('parsing unsupported file format', () => {
  expect(() => {
    getParsedData('data', 'exe');
  }).toThrow(new Error('Unsupported file format: .exe\nSupported file formats: .json .yaml .yml'));
});

test('applying wrong format option', () => {
  expect(() => {
    formatDiff('data', 'flat');
  }).toThrow(new Error('Unsupported format - flat. Please select a supported option.'));
});
