import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import gendiff from '../src/gendiff.js';
import getFixturePath from '../src/getFixturePath.js';

test('gendif', () => {
  const pairs = [
    ['file1.json', 'file2.json'],
    ['file1.yml', 'file2.yml'],
  ];

  const resultPathes = {
    stylish: getFixturePath('resultStylish'),
    plain: getFixturePath('resultPlain'),
    json: getFixturePath('resultJson.json'),
  };

  pairs.forEach(([file1, file2]) => {
    const file1path = getFixturePath(file1);
    const file2path = getFixturePath(file2);
    Object.entries(resultPathes).forEach(([formater, resultPath]) => {
      expect(gendiff(file1path, file2path, formater)).toBe(
        readFileSync(resultPath, 'utf8'),
      );
    });
  });
});
