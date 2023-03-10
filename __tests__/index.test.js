import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index';
import getParsedData from '../src/parsers';
import formatDiff from '../src/formatters';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const formats = ['json', 'yaml', 'yml'];
const formatters = ['stylish', 'plain', 'json'];

describe.each(formatters)('%s formatter', (formatter) => {
  formats.forEach((format) => {
    test(`test with ${format}`, () => {
      const filepath1 = getFixturePath(`file1.${format}`);
      const filepath2 = getFixturePath(`file2.${format}`);
      const expected = readFixture(`expected_${formatter}.txt`);
      expect(genDiff(filepath1, filepath2, formatter)).toEqual(expected);
    });
  });
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
