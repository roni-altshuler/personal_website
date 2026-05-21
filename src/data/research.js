// area splits entries onto /education vs /work-experience.
// 'education' = degrees and academic standing; 'work' = jobs, internships,
// and research positions (master's research counted as work, not education).
export const RESEARCH = [
  {
    id: 'technion-phd',
    area: 'education',
    title: 'Technion – Israel Institute of Technology',
    subtitle: 'PhD in Biology',
    date: '2025 – Present',
    logo: '/logo/Technion_logo.svg',
    logoAlt: 'Technion Logo',
    link: 'https://www.ronharellab.com/',
    summary:
      'First-year PhD student in the Ron-Harel Lab studying immunometabolism and aging',
    bullets: [
      'Graduate Researcher in the Ron-Harel Lab',
      'Focus: ImmunoMetabolism & Aging',
    ],
  },
  {
    id: 'cz-biohub',
    area: 'work',
    title: 'Research Associate II',
    subtitle: 'Chan Zuckerberg Biohub SF',
    date: '2024 – 2025',
    logo: '/logo/CZ-Biohub-SF-Color-RGB.png',
    logoAlt: 'CZ Biohub SF Logo',
    link: 'https://biohub.org/genomics/',
    summary:
      'Computational biology and single-cell genomics projects spanning computer vision, spatial transcriptomics, and sequencing workflows',
    bullets: [
      'Designed and implemented a custom Cellpose-based zebrafish cell segmentation model, increasing the F1 score from 53% to 85%',
      'Developed novel methods to generate training/testing datasets from whole-embryo MERFISH images, including a new strategy to select training data using Shannon’s entropy',
      'Contributed to the Tabula Sapiens Rosetta Donor project by integrating isoform-level information with single-cell gene expression analyses',
      'Performed high-throughput sequencing workflows (QC, MiSeq, NextSeq, NovaSeq) and post-run analysis, including demultiplexing and AWS-based data delivery',
    ],
  },
  {
    id: 'ucsc-genomics',
    area: 'work',
    title: "Master's Research",
    subtitle: 'UC Santa Cruz Genomics Institute',
    date: '2023 – 2024',
    logo: '/logo/GenomicsInstitute.png',
    logoAlt: 'UCSC Genomics Institute Logo',
    link: 'https://cglgenomics.ucsc.edu/',
    summary:
      'Spatial transcriptomic analysis of a human breast-cancer model using a custom Cellpose 2.0 model',
    bullets: [
      'Developed a custom Cellpose 2.0 model for spatial transcriptomic data analysis, achieving precision and recall of 84% and 90%',
      'Identified critical gene expression patterns in a human breast cancer model through spatial differential analysis, revealing insights into the tumor microenvironment',
      'Visualized spatial distributions and performed clustering analyses (UMAP) using Squidpy and Scanpy',
    ],
  },
  {
    id: 'ucsc-ms',
    area: 'education',
    title: 'University of California, Santa Cruz',
    subtitle: 'M.S. in Biomolecular Engineering & Bioinformatics',
    date: '2023 – 2024',
    logo: '/logo/UC_Santa_Cruz_Baskin_Engineering_logo.svg',
    logoAlt: 'UCSC Baskin Engineering Logo',
    link: 'https://engineering.ucsc.edu/',
    summary:
      'Thesis: Spatial Transcriptomic Analysis of Cell Type Distribution and Gene Expression Patterns in a Human Breast Cancer Model',
    bullets: []
  },
  {
    id: 'internships',
    area: 'work',
    title: 'CRISPR Therapeutics Internships',
    subtitle: 'CRISPR-X (2023) & Autoimmune (2022)',
    date: '2022 – 2023',
    logo: '/logo/CRISPR Therapeutics_idsoX7FvVl_1.svg',
    logoAlt: 'CRISPR Therapeutics Logo',
    link: 'https://crisprtx.com/focus-areas/crispr-x',
    summary:
      'Two consecutive internships at CRISPR Therapeutics on knock-in efficiency and CAR-T optimization',
    bullets: [
      [
        '2023',
        'Led a project on 3’-overhang dsDNA integration, significantly boosting CRISPR/Cas9 knock-in efficiency, validated by NGS',
        'Optimized T cell editing by integrating promoterless GFP transgenes and analyzed results with flow cytometry',
      ],
      [
        '2022',
        'Enhanced CAR-T cell performance by analyzing costimulatory domain variations and improving targeting efficiency',
        'Evaluated cancer cell targeting outcomes using advanced flow cytometry and digital droplet PCR (ddPCR)',
      ],
    ],
  },
  {
    id: 'ucsc-bs',
    area: 'education',
    title: 'University of California, Santa Cruz',
    subtitle: 'B.S. in Biomolecular Engineering & Bioinformatics, with Honors',
    date: '2020 – 2023',
    logo: '/logo/UC_Santa_Cruz_Baskin_Engineering_logo.svg',
    logoAlt: 'UCSC Baskin Engineering Logo',
    link: 'https://engineering.ucsc.edu/',
    summary: 'Honors: Dean’s Honors List (2021, 2022, 2023)',
    bullets: [],
  },
];

export const FEATURED_WORK_IDS = ['cz-biohub', 'ucsc-genomics', 'internships'];

export function educationEntries() {
  return RESEARCH.filter((entry) => entry.area === 'education');
}

export function workEntries() {
  return RESEARCH.filter((entry) => entry.area === 'work');
}
