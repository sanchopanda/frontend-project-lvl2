import { test, expect } from '@jest/globals';
import gendiff from '../src/gendiff.js';
import getFixturePath from './getFixturePath.js';

test('gendif', () => {
  const file1path = getFixturePath('file1.json');
  const file2path = getFixturePath('file2.json');
  expect(gendiff(file1path, file2path)).toBe('- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true');
});
