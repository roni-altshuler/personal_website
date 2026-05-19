export const TRACKS = {
  doctoral: { label: 'Doctoral', order: 0 },
  industry: { label: 'Research & Industry', order: 1 },
  masters: { label: "Master's Research", order: 2 },
  internships: { label: 'Industry Internships', order: 3 },
  undergrad: { label: 'Undergraduate', order: 4 },
};

// area splits entries onto /education vs /work-experience.
// 'education' = degrees and academic standing; 'work' = jobs, internships,
// and research positions (master's research counted as work, not education).
export const RESEARCH = [
  {
    id: 'technion-phd',
    area: 'education',
    track: 'doctoral',
    title: 'Technion – Israel Institute of Technology',
    subtitle: 'PhD in Biology',
    date: '2025 – Present',
    logo: '/logo/Technion_logo.svg',
    logoAlt: 'Technion Logo',
    link: 'https://www.ronharellab.com/',
    summary:
      'First-year PhD student in the Ron-Harel Lab studying immunometabolism and aging.',
    bullets: [
      'Graduate Researcher in the Ron-Harel Lab.',
      'Focus: ImmunoMetabolism & Aging.',
    ],
    caseStudy: null,
  },
  {
    id: 'cz-biohub',
    area: 'work',
    track: 'industry',
    title: 'Research Associate II',
    subtitle: 'Chan Zuckerberg Biohub SF',
    date: '2024 – 2025',
    logo: '/logo/CZ-Biohub-SF-Color-RGB.png',
    logoAlt: 'CZ Biohub SF Logo',
    link: 'https://biohub.org/genomics/',
    summary:
      'Built a custom Cellpose zebrafish segmentation model that lifted F1 from 53% to 85%.',
    bullets: [
      'Designed and implemented a custom Cellpose-based zebrafish cell segmentation model, increasing the F1 score from 53% to 85%.',
      'Developed novel methods to generate training/testing datasets from whole-embryo MERFISH images, including a new strategy to select training data using Shannon’s entropy.',
      'Contributed to the Tabula Sapiens Rosetta Donor project by integrating isoform-level information with single-cell gene expression analyses.',
      'Performed high-throughput sequencing workflows (QC, MiSeq, NextSeq, NovaSeq) and post-run analysis, including demultiplexing and AWS-based data delivery.',
    ],
    metrics: [
      { value: '85%', label: 'F1 score', from: '53%' },
    ],
    caseStudy: 'cz-biohub',
  },
  {
    id: 'ucsc-genomics',
    area: 'work',
    track: 'masters',
    title: "Master's Research",
    subtitle: 'UC Santa Cruz Genomics Institute',
    date: '2023 – 2024',
    logo: '/logo/GenomicsInstitute.png',
    logoAlt: 'UCSC Genomics Institute Logo',
    link: 'https://cglgenomics.ucsc.edu/',
    summary:
      'Spatial transcriptomic analysis of a human breast-cancer model using a custom Cellpose 2.0 model.',
    bullets: [
      'Developed a custom Cellpose 2.0 model for spatial transcriptomic data analysis, achieving precision and recall of 84% and 90%.',
      'Identified critical gene expression patterns in a human breast cancer model through spatial differential analysis, revealing insights into the tumor microenvironment.',
      'Visualized spatial distributions and performed clustering analyses (UMAP) using Squidpy and Scanpy.',
    ],
    metrics: [
      { value: '84%', label: 'Precision' },
      { value: '90%', label: 'Recall' },
    ],
    caseStudy: 'ucsc-genomics',
  },
  {
    id: 'ucsc-ms',
    area: 'education',
    track: 'masters',
    title: 'University of California, Santa Cruz',
    subtitle: 'M.S. in Biomolecular Engineering & Bioinformatics',
    date: '2023 – 2024',
    logo: '/logo/UC_Santa_Cruz_Baskin_Engineering_logo.svg',
    logoAlt: 'UCSC Baskin Engineering Logo',
    link: 'https://engineering.ucsc.edu/',
    summary:
      'Thesis: Spatial Transcriptomic Analysis of Cell Type Distribution and Gene Expression Patterns in a Human Breast Cancer Model.',
    bullets: [
      'Thesis: Spatial Transcriptomic Analysis of Cell Type Distribution and Gene Expression Patterns in a Human Breast Cancer Model.',
    ],
    caseStudy: null,
  },
  {
    id: 'internships',
    area: 'work',
    track: 'internships',
    title: 'CRISPR Therapeutics Internships',
    subtitle: 'CRISPR-X (2023) & Autoimmune (2022)',
    date: '2022 – 2023',
    logo: '/logo/CRISPR Therapeutics_idsoX7FvVl_1.svg',
    logoAlt: 'CRISPR Therapeutics Logo',
    link: 'https://crisprtx.com/focus-areas/crispr-x',
    summary:
      'Two consecutive internships at CRISPR Therapeutics on knock-in efficiency and CAR-T optimization.',
    bullets: [
      'CRISPR-X (2023): Led a project on 3’-overhang dsDNA integration, significantly boosting CRISPR/Cas9 knock-in efficiency, validated by NGS.',
      'CRISPR-X (2023): Optimized T cell editing by integrating promoterless GFP transgenes and analyzed results with flow cytometry.',
      'Autoimmune (2022): Enhanced CAR-T cell performance by analyzing costimulatory domain variations and improving targeting efficiency.',
      'Autoimmune (2022): Evaluated cancer cell targeting outcomes using advanced flow cytometry and digital droplet PCR (ddPCR).',
    ],
    caseStudy: 'internships',
  },
  {
    id: 'ucsc-bs',
    area: 'education',
    track: 'undergrad',
    title: 'University of California, Santa Cruz',
    subtitle: 'B.S. in Biomolecular Engineering & Bioinformatics, with Honors',
    date: '2020 – 2023',
    logo: '/logo/UC_Santa_Cruz_Baskin_Engineering_logo.svg',
    logoAlt: 'UCSC Baskin Engineering Logo',
    link: 'https://engineering.ucsc.edu/',
    summary: 'Honors: Dean’s Honors List (2021, 2022, 2023).',
    bullets: ['Honors: Dean’s Honors List (2021, 2022, 2023).'],
    caseStudy: null,
  },
];

export const FEATURED_RESEARCH_IDS = ['cz-biohub', 'ucsc-genomics', 'internships'];

export const CASE_STUDY_SLUGS = ['cz-biohub', 'ucsc-genomics', 'internships'];

export function getResearchEntry(id) {
  return RESEARCH.find((entry) => entry.id === id || entry.caseStudy === id) || null;
}

export function groupedResearch() {
  const groups = new Map();
  for (const entry of RESEARCH) {
    if (!groups.has(entry.track)) groups.set(entry.track, []);
    groups.get(entry.track).push(entry);
  }
  return [...groups.entries()]
    .sort((a, b) => TRACKS[a[0]].order - TRACKS[b[0]].order)
    .map(([track, entries]) => ({ track, label: TRACKS[track].label, entries }));
}

export function educationEntries() {
  return RESEARCH.filter((entry) => entry.area === 'education');
}

export function workEntries() {
  return RESEARCH.filter((entry) => entry.area === 'work');
}
