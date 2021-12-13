enum Source {
  Kidney = 'Kidney',
  GESkin = 'GE Skin',
  CellarLymphNode = 'Cellar Lymph Node'
}

enum GraphAttribute {
  None = '',
  CellType = 'cell_type',
  Dataset = 'dataset',
  Count = 'count',
  Percentage = 'percentage',
  Order = 'order',
  Sex = 'sex',
  Ethnicity = 'race',
  Age = 'age',
  Category = 'cat',
  Exposure = 'exp',
  Location = 'location',
  Laterality = 'laterality',
  YPosition = 'y_pos'
}

enum OrderType {
  Ascending = 'ascending',
  Descending = 'descending'
}

// Colors from https://medialab.github.io/iwanthue/
const colorPaletteLarge = [
  '#db95cd',
  '#c8feba',
  '#ddb1f6',
  '#c2db90',
  '#f8b8f6',
  '#99d99d',
  '#a5a6e4',
  '#e1e294',
  '#3bb7ed',
  '#eda17a',
  '#6efcfa',
  '#ffa498',
  '#2ecdce',
  '#e395ad',
  '#98ffdf',
  '#dd99a2',
  '#87fff1',
  '#ffb1b5',
  '#2ebfb2',
  '#d3a36a',
  '#6bb2ed',
  '#ffe79f',
  '#8dc5ff',
  '#c0b46a',
  '#d5cfff',
  '#80e2b9',
  '#cf9fa8',
  '#beffd4',
  '#cfa19a',
  '#87f0ff',
  '#d2a186',
  '#42bbcc',
  '#ffd2a3',
  '#9ddfff',
  '#fff5b5',
  '#b7d4ff',
  '#e1ffca',
  '#ffd4e4',
  '#6ebb96',
  '#ffd2c1',
  '#71b6c3',
  '#c8a580',
  '#c0fff8',
  '#c8a491',
  '#ddffe6',
  '#bca98f',
  '#d6e8ff',
  '#87b78b',
  '#fdf7ff',
  '#a3b090',
  '#fff8ee',
  '#89b3ba',
  '#f7ffeb',
  '#aeaba5',
  '#9fb0a0'
]

const colorPaletteSmall = [
  "#ffe5be",
  "#8ec6f6",
  "#f6b89c",
  "#92f4ff",
  "#ffb9b6",
  "#75d0c5",
  "#c0bbf2",
  "#9bbc8a",
  "#a9a8ce",
  "#bcfeda",
  "#bba5b6",
  "#9ad7b1",
  "#e4e3ff",
  "#b3ad82",
  "#73b5cd",
  "#deffe0",
  "#c2a692",
  "#dffaff",
  "#87b4af",
  "#ffe7ec"
]

interface Configuration {
  label: string,
  basePath: string,
  datasets: string[],
  groupTypes: Record<string, GraphAttribute>,
  fixed?: number,
  colorPalette: string[],
  sortAttributes: string[]
}

const Presets: Array<Configuration> = [
  {
    label: Source.Kidney,
    basePath: 'data/azimuth_kidney/',
    datasets: [
      'ASCT+B',
      'Azimuth_L3',
      'CellxGene',
      'HBM264.RWRW.668',
      'HBM358.KDDT.729',
      'HBM665.PTMR.889',
      'HBM773.WCXC.264',
      '18-162',
      '18-142',
      '18-312',
      'HBM224.GLDC.549',
      'HBM797.PDPS.368',
      'HBM399.TFTQ.282',
      'HBM432.BPZM.698',
      'HBM578.SRZG.769',
      'HBM839.TQNM.958',
      'HBM992.XNZH.647',
      'HBM764.ZCQR.585',
      'HBM574.NFCS.842',
      'HBM537.LTFK.379',
      'HBM382.HNKL.447',
      'HBM892.MXFF.848',
      'HBM982.TPNQ.737',
      'HBM375.ZKZZ.765'
    ],
    groupTypes: {
      Sex: GraphAttribute.Sex,
      Ethnicity: GraphAttribute.Ethnicity,
      Location: GraphAttribute.Location,
      Laterality: GraphAttribute.Laterality
    },
    fixed: 3,
    colorPalette: colorPaletteLarge,
    sortAttributes: [getAttributeTitle(GraphAttribute.YPosition)]
  },
  {
    label: Source.GESkin,
    basePath: 'data/ge_skin/',
    datasets: [
      'HBM654.BKGL.942',
      'HBM253.HFDZ.866',
      'HBM396.WPKL.954',
      'HBM894.PGJZ.258',
      'HBM669.GWVL.893',
      // 'HBM755.MZNB.996',
      'HBM639.SGGN.469',
      'HBM865.PBJW.845',
      'HBM297.VBLS.984',
      'HBM969.VNQL.553',
      'HBM229.HKHH.537',
      'HBM228.BBHS.986',
    ],
    groupTypes: {
      Sex: GraphAttribute.Sex,
      Age: GraphAttribute.Age,
      Category: GraphAttribute.Category,
      Exposure: GraphAttribute.Exposure
    },
    fixed: 0,
    colorPalette: colorPaletteSmall,
    sortAttributes: [getAttributeTitle(GraphAttribute.YPosition)]
  },
  {
    label: Source.CellarLymphNode,
    basePath: 'data/cellar_lymph_node/',
    datasets: [
      'CODEX_Florida_19-003-lymph-node-R2',
      // 'CODEX_Florida_20-008-lymphnode10_lefthalf',
      'CODEX_Florida_20-008-lymphnode10_righthalf'
    ],
    groupTypes: {},
    fixed: 0,
    colorPalette: colorPaletteSmall,
    sortAttributes: []
  }
]

function getAttributeTitle(attribute: GraphAttribute) : string {
  switch (attribute) {
  case GraphAttribute.Dataset: return 'Dataset'
  case GraphAttribute.CellType: return 'Cell Type'
  case GraphAttribute.Count: return 'Cell Count'
  case GraphAttribute.Percentage: return 'Cell Proportion'
  case GraphAttribute.Sex: return 'Sex'
  case GraphAttribute.Ethnicity: return 'Ethnicity'
  case GraphAttribute.Category: return 'Category'
  case GraphAttribute.Age: return 'Age'
  case GraphAttribute.Exposure: return 'Exposure'
  case GraphAttribute.Laterality: return 'Laterality'
  case GraphAttribute.Location: return 'Location'
  case GraphAttribute.YPosition: return 'Vertical Tissue Block Position'
  default: return ''
  }
}

export {
  GraphAttribute,
  OrderType,
  Configuration,
  Presets,
  getAttributeTitle
}
