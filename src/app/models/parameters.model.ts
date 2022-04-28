enum Source {
  BlueLakeKidney = 'bluelake_kidney',
  GESkin = 'ge_skin',
  HuBMAPLymphNode = 'hubmap_lymphnode',
  GCAColon = 'gca_colon',
  GTExBreast = 'gtex_breast',
  GTExEsophagusMucosa = 'gtex_esophagusmucosa',
  GTExEsophagusMuscularis = 'gtex_esophagusmuscularis',
  GTExHeart = 'gtex_heart',
  GTExLung = 'gtex_lung',
  GTExProstate = 'gtex_prostate',
  GTEXSkeletalMuscle = 'gtex_skeletalmuscle',
  GTEXSkin = 'gtex_skin',
  HuBMAPKidney = 'hubmap_kidney',
  NeMOBrainMotorCortex = 'nemo_brainmotorcortex'
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
  YPosition = 'y_pos',
  DonorId = 'donor_id'
}

enum OrderType {
  Ascending = 'ascending',
  Descending = 'descending'
}

const previewModes = ['azimuth-kidney'] as const;
type PreviewMode = (typeof previewModes)[number];

function isOfTypePreviewMode(mode: string): mode is PreviewMode {
  return (previewModes as readonly string[]).includes(mode);
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

const PreviewPresets: Record<string, Configuration> = {
  [Source.BlueLakeKidney]: {
    label: 'Kidney',
    basePath: 'https://docs.google.com/spreadsheets/d/1yYIOdfgJoNqVij9kAQabY2n789GsaV6OOm0b71VIcKE/gviz/tq?tqx=out:csv',
    datasets: [
      'ASCT+B',
      'Azimuth (L3)',
      'KPMP CellxGene',
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
  }
}

const Presets: Record<Source, Configuration> = {
  [Source.BlueLakeKidney]: {
    label: 'Kidney—Blue Lake (21 datasets)',
    basePath: 'https://docs.google.com/spreadsheets/d/1yYIOdfgJoNqVij9kAQabY2n789GsaV6OOm0b71VIcKE/gviz/tq?tqx=out:csv',
    datasets: [
      'ASCT+B',
      'Azimuth (L3)',
      'KPMP CellxGene',
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
  [Source.GESkin]: {
    label: 'Skin—Soumya et al. paper (12 datasets)',
    basePath: 'https://docs.google.com/spreadsheets/d/1spA1vHD7COVcsBXMFCf1VYHWIk0Cw_LDZwNmDEObOuI/gviz/tq?tqx=out:csv',
    datasets: [
      // Region 6 and region 12 data to be excluded.
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
      // 'HBM228.BBHS.986',
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
  [Source.HuBMAPLymphNode]: {
    label: 'Lymph Node—HuBMAP Portal (2 CODEX datasets)',
    basePath: 'https://docs.google.com/spreadsheets/d/1Jy9yWHVN4sqlJeNrNPt2iHlSVGUc04mPTWlTflpe9CA/gviz/tq?tqx=out:csv',
    datasets: [
      'CODEX_Florida_19-003-lymph-node-R2',
      // 'CODEX_Florida_20-008-lymphnode10_lefthalf',
      'CODEX_Florida_20-008-lymphnode10_righthalf'
    ],
    groupTypes: {},
    fixed: 0,
    colorPalette: colorPaletteSmall,
    sortAttributes: []
  },
  [Source.GCAColon]: {
    label: 'Colon—Gut Cell Atlas (5 datasets)',
    basePath: 'https://docs.google.com/spreadsheets/d/1Ql0e1NU1Oi7ki5_E5UT9H96JX6-DrG6O1aOUtb0yngw/gviz/tq?tqx=out:csv',
    datasets: [
      '290b',
      '298c',
      '302c',
      '390c',
      '417c'
    ],
    groupTypes: {},
    fixed: 0,
    colorPalette: colorPaletteLarge,
    sortAttributes: []
  },
  [Source.GTExBreast]: {
    label: 'Breast—GTEx Portal (3 datasets)',
    basePath: 'https://docs.google.com/spreadsheets/d/1yE6S8DIKYN6k15SWdLu7YRzluAm2n_MSMdZc2k4NhuI/gviz/tq?tqx=out:csv',
    datasets: [
      'GTEX-1CAMS-5015',
      'GTEX-1MCC2-5013',
      'GTEX-1R9PN-5002'
    ],
    groupTypes: {
      'Age Group': GraphAttribute.Age
    },
    fixed: 0,
    colorPalette: colorPaletteSmall,
    sortAttributes: []
  },
  [Source.GTExEsophagusMucosa]: {
    label: 'Esophagus Mucosa—GTEx Portal (3 datasets)',
    basePath: 'https://docs.google.com/spreadsheets/d/1X3J8Obj88LqG1csL8xwL5_7Vp3KnliigMaWBOq0Swo8/gviz/tq?tqx=out:csv',
    datasets: [
      'GTEX-145ME-5005',
      'GTEX-15SB6-5008',
      'GTEX-16BQI-5013'
    ],
    groupTypes: {
      Sex: GraphAttribute.Sex,
      'Age Group': GraphAttribute.Age
    },
    fixed: 0,
    colorPalette: colorPaletteSmall,
    sortAttributes: []
  },
  [Source.GTExEsophagusMuscularis]: {
    label: 'Esophagus Muscularis—GTEx Portal (3 datasets)',
    basePath: 'https://docs.google.com/spreadsheets/d/1Q1h72S-058xyBYCuO3iZjfgYV2uGLtlKZeqjbRbxCi8/gviz/tq?tqx=out:csv',
    datasets: [
      'GTEX-144GM-5010',
      'GTEX-1HSMQ-5021',
      'GTEX-1ICG6-5014'
    ],
    groupTypes: {
      Sex: GraphAttribute.Sex,
      'Age Group': GraphAttribute.Age
    },
    fixed: 0,
    colorPalette: colorPaletteSmall,
    sortAttributes: []
  },
  [Source.GTExHeart]: {
    label: 'Heart—GTEx Portal (3 datasets)',
    basePath: 'https://docs.google.com/spreadsheets/d/1AzZ2zl4BG7FdTJ9c7k-yhccOjMup6VbIfxKhp9GFhQc/gviz/tq?tqx=out:csv',
    datasets: [
      'GTEX-13N11-5002',
      'GTEX-15RIE-5015',
      'GTEX-1ICG6-5003'
    ],
    groupTypes: {
      Sex: GraphAttribute.Sex,
      'Age Group': GraphAttribute.Age
    },
    fixed: 0,
    colorPalette: colorPaletteSmall,
    sortAttributes: []
  },
  [Source.GTExLung]: {
    label: 'Lung—GTEx Portal (3 datasets)',
    basePath: 'https://docs.google.com/spreadsheets/d/1x7FI_7YshMKKSUdKpTI4M75VMxTp91fuMLJ2E2gPmFc/gviz/tq?tqx=out:csv',
    datasets: [
      'GTEX-13N11-5030',
      'GTEX-15CHR-5005',
      'GTEX-1HSMQ-5005'
    ],
    groupTypes: {
      Sex: GraphAttribute.Sex,
      'Age Group': GraphAttribute.Age
    },
    fixed: 0,
    colorPalette: colorPaletteSmall,
    sortAttributes: []
  },
  [Source.GTExProstate]: {
    label: 'Prostate—GTEx Portal (4 datasets)',
    basePath: 'https://docs.google.com/spreadsheets/d/1RHmy6GAeGPpXTgH0bWq3uXDrPkxRx9g4ONiOQDIfUHE/gviz/tq?tqx=out:csv',
    datasets: [
      'GTEX-12BJ1-5007',
      'GTEX-15CHR-5014',
      'GTEX-1HSMQ-5014',
      'GTEX-1I1GU-5006'
    ],
    groupTypes: {
      'Age Group': GraphAttribute.Age
    },
    fixed: 0,
    colorPalette: colorPaletteSmall,
    sortAttributes: []
  },
  [Source.GTEXSkeletalMuscle]: {
    label: 'Skeletal Muscle—GTEx Portal (3 datasets)',
    basePath: 'https://docs.google.com/spreadsheets/d/1AK9mbm6fIPWQxizF-BFmodiFFbUgQ2rx6Ec7MfOwgog/gviz/tq?tqx=out:csv',
    datasets: [
      'GTEX-145ME-5018',
      'GTEX-15RIE-5021',
      'GTEX-1HSMQ-5011',
    ],
    groupTypes: {
      Sex: GraphAttribute.Sex,
      'Age Group': GraphAttribute.Age
    },
    fixed: 0,
    colorPalette: colorPaletteSmall,
    sortAttributes: []
  },
  [Source.GTEXSkin]: {
    label: 'Skin—GTEx Portal (3 datasets)',
    basePath: 'https://docs.google.com/spreadsheets/d/1SlSan9HeMPayZXbRskxXg5i9qcOsVOyxzav-4D3jDio/gviz/tq?tqx=out:csv',
    datasets: [
      'GTEX-15EOM-5003',
      'GTEX-1CAMR-5015',
      'GTEX-1HSMQ-5007',
    ],
    groupTypes: {
      Sex: GraphAttribute.Sex,
      'Age Group': GraphAttribute.Age
    },
    fixed: 0,
    colorPalette: colorPaletteSmall,
    sortAttributes: []
  },
  [Source.HuBMAPKidney]: {
    label: 'Kidney—HuBMAP Portal (47 datasets)',
    basePath: 'https://raw.githubusercontent.com/hubmapconsortium/tissue-bar-graphs/sheets/csv/HuBMAP_Kidney',
    datasets: [
      'HBM242.HNLH.466',
      'HBM243.MTZV.726',
      'HBM243.TTRM.823',
      'HBM246.KBZS.276',
      'HBM252.JLSW.848',
      'HBM258.HQCL.349',
      'HBM282.BKRZ.254',
      'HBM297.XVDG.492',
      'HBM332.KQWB.454',
      'HBM347.MRTV.333',
      'HBM356.QPJF.839',
      'HBM388.SGMJ.342',
      'HBM393.DZDZ.972',
      'HBM427.KFXP.323',
      'HBM447.KCHB.778',
      'HBM476.VHDB.268',
      'HBM476.ZWMS.768',
      'HBM495.ZFDT.229',
      'HBM525.LRPL.332',
      'HBM532.RKTB.483',
      'HBM537.GVTL.683',
      'HBM537.SKND.632',
      'HBM552.PBBF.363',
      'HBM563.FJNH.776',
      'HBM634.QQWF.789',
      'HBM664.LQSH.693',
      'HBM679.ZVHH.999',
      'HBM684.TLPQ.738',
      'HBM688.FLJB.475',
      'HBM692.FLDL.779',
      'HBM752.ZRBH.538',
      'HBM785.LNQZ.992',
      'HBM799.ZJDP.379',
      'HBM834.THPC.928',
      'HBM837.TDQQ.538',
      'HBM844.KXXX.692',
      'HBM865.TRVX.355',
      'HBM873.NSHG.559',
      'HBM876.HTRX.668',
      'HBM892.HQDK.764',
      'HBM932.TBDW.952',
      'HBM938.FTRX.289',
      'HBM942.NXWW.245',
      'HBM958.GZCX.985',
      'HBM979.KNQM.454',
      'HBM994.XRGN.328',
      'HBM996.XSNK.694'
    ],
    groupTypes: {
      Age: GraphAttribute.Age,
      Donor: GraphAttribute.DonorId,
      Ethnicity: GraphAttribute.Ethnicity,
      Sex: GraphAttribute.Sex,
    },
    fixed: 0,
    colorPalette: colorPaletteLarge,
    sortAttributes: []
  },
  [Source.NeMOBrainMotorCortex]: {
    label: 'Brain Motor Cortex—NeMO Data Portal (14 datasets)',
    basePath: 'https://raw.githubusercontent.com/hubmapconsortium/tissue-bar-graphs/sheets/csv/NeMO_Portal',
    datasets: [
      '10X159-1',
      '10X159-2',
      '10X159-3',
      '10X159-4',
      '10X159-5',
      '10X159-6',
      '10X159-7',
      '10X160-1',
      '10X160-2',
      '10X160-3',
      '10X160-5',
      '10X160-6',
      '10X160-7',
      '10X160-8'
    ],
    groupTypes: {},
    fixed: 0,
    colorPalette: colorPaletteLarge,
    sortAttributes: []
  }
}

function getAttributeTitle(attribute: GraphAttribute): string {
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
    case GraphAttribute.DonorId: return 'Donor'
    default: return ''
  }
}

export {
  Source,
  GraphAttribute,
  OrderType,
  Configuration,
  PreviewMode,
  Presets,
  PreviewPresets,
  getAttributeTitle,
  isOfTypePreviewMode
}
