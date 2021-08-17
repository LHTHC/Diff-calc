import _ from 'lodash';
import { readFile } from './utilities.js';

export default (file1, file2) => {
  const data1 = JSON.parse(readFile(file1));
  const data2 = JSON.parse(readFile(file2));

  const keys = _.orderBy(_.union(Object.keys(data1), Object.keys(data2)));

  const result = keys.map((key) => {
    if (_.has(data1, key) && !_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}\n`;
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return `  + ${key}: ${data2[key]}\n`;
    }
    if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${[key]}: ${data2[key]}\n`;
    }
    return `    ${key}: ${data2[key]}\n`;
  });
  return `{\n${result.join('')}}`;
};