import path from 'path';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';

export default (file) => {
  const extension = path.extname(file);
  switch (extension) {
    case '.json':
      return JSON.parse(readFileSync(file, 'utf8'));
    case '.yml':
      return yaml.load(readFileSync(file, 'utf8'));
    default:
      throw new Error(`Unsupported extension: '${extension}'!`);
  }
};
