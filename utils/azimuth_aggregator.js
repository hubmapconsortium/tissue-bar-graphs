import fs from 'fs'
import path from 'path'
import * as d3 from 'd3'

// Sample configuration for kidney prediction outputs
const INPUT_DIR = '../azimuth-predictions/hubmap-kidney/prediction_scores'
const OUTPUT_DIR = 'cell_counts'
const groupAttr = 'predicted.annotation.l3'

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
} else {
  fs.rmSync(OUTPUT_DIR, {
    recursive: true,
    force: true
  });
  fs.mkdirSync(OUTPUT_DIR);
}

const metaAttrMap = new Map()
if (fs.existsSync('lookup.csv')) {
  const lookupFile = fs.readFileSync('lookup.csv', {
    encoding: 'utf-8',
    flag: 'r'
  })
  const lookupRows = d3.csvParse(lookupFile)
  lookupRows.forEach(row => {
    const { hubmap_id, ...rest } = row
    metaAttrMap.set(hubmap_id, rest)
  })
  // console.debug(metaAttrMap)
}

fs.readdir(INPUT_DIR, function (err, files) {
  //handling error
  if (err) {
    console.error('Unable to scan directory: ' + err);
  }
  files.forEach(function (file) {
    const csvFile = fs.readFileSync(path.join(INPUT_DIR, file), {
      encoding: 'utf-8',
      flag: 'r'
    })
    const csvRows = d3.csvParse(csvFile)
    const cellMap = new Map()
    const metaAttr = metaAttrMap.get(file.replace('.csv', '')) || {}
    csvRows.forEach(row => {
      const key = row[groupAttr]
      if (cellMap.has(key)) {
        const value = cellMap.get(key)
        cellMap.set(key, {
          ...metaAttr,
          ...value,
          count: value.count + 1
        })
      } else {
        cellMap.set(key, { count: 1, percentage: csvRows.length, ...metaAttr })
      }
    })

    // Compute percentages
    for (const cellObj of cellMap.values()) {
      cellObj['percentage'] = (cellObj['count'] * 100 / csvRows.length).toPrecision(6)
    }

    const summaryText = d3.csvFormat(
      Array.from(cellMap)
        .sort(([key1], [key2]) => key1.localeCompare(key2))
        .map(([key, value]) => {
          return {
            'cell_type': key,
            ...value
          }
        })
    );
    fs.writeFileSync(path.join(OUTPUT_DIR, file), summaryText, { encoding: 'utf-8', flag: 'w' })
  });
});
