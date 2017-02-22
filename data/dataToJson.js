const fs = require('fs');

function csvRowToRecord(csvRow, headers) {
  return csvRow.reduce((acc, cell, i) =>
    Object.assign(acc, { [headers[i]]: cell }), {});
}

function csvToRecords(csvData) {
  const data = csvData.split('\n').map(row => row.split(','));
  const headers = data[0]
  return data
    .slice(1)
    .filter(row => row.length === headers.length)
    .reduce((acc, row) =>
      Object.assign(acc, { [row[0]]: csvRowToRecord(row, headers) }), {});
}

const dataFiles = [
  { inFile: 'episodes.csv', outFile: 'episodes.json' },
];

for (const data of dataFiles) {
  const csvData = fs.readFileSync(data.inFile, { encoding: 'utf-8' });
  const records = csvToRecords(csvData);
  const jsonData = JSON.stringify(records);
  fs.writeFileSync(data.outFile, jsonData);
}



