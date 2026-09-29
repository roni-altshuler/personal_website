// Keep the items shape compatible with the original skills route.
// Evidence links point to roles where these methods were used.
export const SKILLS = [
  {
    pillar: 'Single Cell & Spatial Analysis',
    icon: 'fa-dna',
    items: ['Python', 'R', 'Scanpy', 'Squidpy', 'AnnData', 'Jupyter'],
    description: 'Cell annotation, clustering, and spatial gene expression analysis in breast tumor imaging and immune cell research.',
    evidence: [
      { label: 'Current PhD research', href: '/research#technion-phd' },
      { label: 'Master’s research', href: '/research#ucsc-genomics' },
    ],
  },
  {
    pillar: 'Imaging & Segmentation',
    icon: 'fa-microscope',
    items: ['Cellpose', 'MERFISH', 'MERSCOPE', 'Pandas', 'Matplotlib'],
    description: 'Cell segmentation, selection of training images, and analysis of spatial transcriptomics data.',
    evidence: [
      { label: 'Biohub image analysis', href: '/research#cz-biohub' },
      { label: 'Spatial transcriptomics', href: '/research#ucsc-genomics' },
    ],
  },
  {
    pillar: 'Experimental Biology',
    icon: 'fa-flask',
    items: ['Stromal Cell Culture', 'T-Cell Coculture', 'Flow Cytometry', 'Immunofluorescence', 'Confocal Microscopy', 'CRISPR/Cas9', 'FlowJo', 'qPCR', 'ddPCR'],
    description: 'Cell isolation, culture, staining, and imaging in my PhD research, with earlier experience in gene editing and cellular assays for T-cell and CAR T research.',
    evidence: [
      { label: 'PhD experimental research', href: '/research#technion-phd' },
      { label: 'CRISPR Therapeutics internships', href: '/research#internships' },
    ],
  },
  {
    pillar: 'Sequencing & Computational Workflows',
    icon: 'fa-code',
    items: ['NGS', 'Sequencing QC', 'Demultiplexing', 'Linux', 'Git', 'AWS'],
    description: 'Sequencing, quality control, and documented computational workflows for biological data.',
    evidence: [
      { label: 'Biohub genomics workflows', href: '/research#cz-biohub' },
      { label: 'Current PhD research', href: '/research#technion-phd' },
    ],
  },
];
