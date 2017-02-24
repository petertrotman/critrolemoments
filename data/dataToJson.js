const fs = require('fs');
const path = require('path');
const parse = require('csv-parse/lib/sync');  // eslint-disable-line import/no-extraneous-dependencies

function csvRowToRecord(csvRow, headers) {
  return csvRow.reduce((acc, cell, i) =>
    Object.assign(acc, { [headers[i]]: cell }), {});
}

function csvToRecords(csvData) {
  const data = parse(csvData);
  const headers = data[0];
  const idIndex = headers.findIndex(h => h === 'id');
  return data
    .slice(1)
    .filter(row => row.length === headers.length)
    .reduce((acc, row, i) =>
      Object.assign(acc, {
        [idIndex !== -1 ? row[idIndex] : i]: csvRowToRecord(row, headers),
      }), {});
}

const dataFiles = [
  { inFile: 'episodes.csv', outFile: 'episodes.json' },
  { inFile: 'moments.csv', outFile: 'moments.json' },
];

for (const data of dataFiles) {  // eslint-disable-line no-restricted-syntax
  const csvData = fs.readFileSync(path.join(__dirname, data.inFile), { encoding: 'utf-8' });
  const records = csvToRecords(csvData);
  const jsonData = JSON.stringify(records);
  fs.writeFileSync(path.join(__dirname, data.outFile), jsonData);
}
