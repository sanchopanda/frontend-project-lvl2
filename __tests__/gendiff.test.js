import { test, expect } from '@jest/globals';
import gendiff from '../src/gendiff.js';
import getFixturePath from '../src/getFixturePath.js';

test('gendif', () => {
  const pairs = [
    ['file1.json', 'file2.json'],
    ['file1.yml', 'file2.yml'],
  ];

  pairs.forEach(([file1, file2]) => {
    const file1path = getFixturePath(file1);
    const file2path = getFixturePath(file2);
    expect(gendiff(file1path, file2path)).toBe(
      '- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true',
    );
  });
});
