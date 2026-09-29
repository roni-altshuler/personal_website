// Degrees appear on /about; current PhD work and research roles appear on /research.
// Master's research is a research role distinct from its degree entry.
export const RESEARCH = [
  {
    id: 'technion-phd',
    methods: ['Stromal Cell Culture', 'T-Cell Coculture', 'Flow Cytometry', 'Immunofluorescence', 'Confocal Microscopy', 'Single Cell RNA Sequencing', 'Spatial Transcriptomics'],
    area: 'education',
    title: 'Technion, Israel Institute of Technology',
    subtitle: 'PhD in Biology',
    role: 'PhD Student, Ron-Harel Lab',
    date: 'Since 2025',
    logo: '/logo/Technion_logo.svg',
    logoAlt: 'Technion Logo',
    link: 'https://ronharellab.technion.ac.il/',
    summary:
      'I study immunometabolism and aging in the Ron-Harel Lab, combining experiments with lymph node stromal cells and T-cells with single cell and spatial analysis.',
    bullets: [
      'Isolating and culturing lymph node stromal cells and working with stromal cell and T-cell cocultures.',
      'Using immunofluorescence staining and confocal microscopy to examine cultured cells and extracellular matrix, alongside flow cytometry for cell characterization.',
      'Developing computational workflows for single cell and spatial transcriptomics, including cell annotation and comparisons of gene expression across conditions.',
    ],
  },
  {
    id: 'cz-biohub',
    methods: ['Cellpose', 'MERFISH', 'Single Cell Genomics', 'Sequencing QC', 'AWS'],
    area: 'work',
    title: 'Research Associate II',
    subtitle: 'Chan Zuckerberg Biohub SF',
    date: '2024 to 2025',
    logo: '/logo/CZ-Biohub-SF-Color-RGB.png',
    logoAlt: 'CZ Biohub SF Logo',
    link: 'https://biohub.org/genomics/',
    summary:
      'Built image analysis tools and contributed to single cell genomics and sequencing workflows at Chan Zuckerberg Biohub San Francisco.',
    bullets: [
      'Developed a custom Cellpose model for zebrafish cell segmentation in MERFISH images of whole embryos.',
      'Created training and testing datasets for image segmentation, including an approach to selecting training images using Shannon’s entropy.',
      'Contributed to the Tabula Sapiens Rosetta Donor project by integrating isoform information with single cell gene expression analyses.',
      'Performed sequencing workflows on MiSeq, NextSeq, and NovaSeq, including quality control, demultiplexing, and data delivery through AWS.',
    ],
  },
  {
    id: 'ucsc-genomics',
    methods: ['Cellpose', 'MERSCOPE', 'Scanpy', 'Squidpy', 'Python'],
    area: 'work',
    title: "Master's Research",
    subtitle: 'UC Santa Cruz Genomics Institute',
    date: '2023 to 2024',
    logo: '/logo/GenomicsInstitute.png',
    logoAlt: 'UCSC Genomics Institute Logo',
    link: 'https://cglgenomics.ucsc.edu/',
    summary:
      'Combined image segmentation and spatial gene expression analysis in a human breast cancer model for my master’s research.',
    bullets: [
      'Developed a custom Cellpose 2.0 segmentation model for a public Vizgen MERSCOPE breast tumor dataset.',
      'Used Scanpy and Squidpy to explore cell type distributions, clustering, and spatial gene expression patterns.',
      'Connected cell boundaries identified from images with transcriptomic analysis in an exploratory study of a single specimen.',
    ],
  },
  {
    id: 'ucsc-ms',
    area: 'education',
    title: 'University of California, Santa Cruz',
    subtitle: 'M.S. in Biomolecular Engineering & Bioinformatics',
    date: '2023 to 2024',
    logo: '/logo/UC_Santa_Cruz_Baskin_Engineering_logo.svg',
    logoAlt: 'UCSC Baskin Engineering Logo',
    link: 'https://engineering.ucsc.edu/',
    summary:
      'Thesis: Spatial Transcriptomic Analysis of Cell Type Distribution and Gene Expression Patterns in a Human Breast Cancer Model',
    bullets: []
  },
  {
    id: 'internships',
    methods: ['CRISPR/Cas9', 'T-Cell Culture', 'Flow Cytometry', 'ddPCR', 'NGS'],
    area: 'work',
    title: 'CRISPR Therapeutics Internships',
    subtitle: 'CRISPR-X (2023) & Autoimmune (2022)',
    date: '2022 to 2023',
    logo: '/logo/CRISPR Therapeutics_idsoX7FvVl_1.svg',
    logoAlt: 'CRISPR Therapeutics Logo',
    link: 'https://crisprtx.com/focus-areas/crispr-x',
    summary:
      'Completed two consecutive internships at CRISPR Therapeutics studying targeted DNA integration and CAR T-cell optimization.',
    bullets: [
      [
        '2023',
        'Investigated integration of double stranded DNA with 3′ overhangs using CRISPR/Cas9, then assessed editing outcomes through sequencing.',
        'Worked on promoterless GFP integration in T-cells and evaluated editing with flow cytometry.',
      ],
      [
        '2022',
        'Studied variations in costimulatory domains in CAR T-cells and their effects on cancer cell targeting.',
        'Evaluated experimental outcomes with flow cytometry and digital droplet PCR (ddPCR).',
      ],
    ],
  },
  {
    id: 'ucsc-bs',
    area: 'education',
    title: 'University of California, Santa Cruz',
    subtitle: 'B.S. in Biomolecular Engineering & Bioinformatics, with Honors',
    date: '2020 to 2023',
    logo: '/logo/UC_Santa_Cruz_Baskin_Engineering_logo.svg',
    logoAlt: 'UCSC Baskin Engineering Logo',
    link: 'https://engineering.ucsc.edu/',
    summary: 'Honors: Dean’s Honors List (2021, 2022, 2023)',
    bullets: [],
  },
];

export const FEATURED_WORK_IDS = ['technion-phd', 'cz-biohub', 'ucsc-genomics'];

export function researchEntries() {
  return RESEARCH.filter((entry) => entry.id === 'technion-phd' || entry.area === 'work');
}

export function educationEntries() {
  return RESEARCH.filter((entry) => entry.area === 'education');
}

export function workEntries() {
  return RESEARCH.filter((entry) => entry.area === 'work');
}
