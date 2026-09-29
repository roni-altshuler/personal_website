import Image from 'next/image';

const DIMENSIONS = {
  '/logo/Technion_logo.svg': [170, 245],
  '/logo/CZ-Biohub-SF-Color-RGB.png': [1000, 225],
  '/logo/GenomicsInstitute.png': [225, 225],
  '/logo/UC_Santa_Cruz_Baskin_Engineering_logo.svg': [815, 124],
  '/logo/CRISPR Therapeutics_idsoX7FvVl_1.svg': [332, 361],
};

/** Original organization artwork, contained on a neutral plaque on the light background. */
export default function OrganizationLogo({ entry, src = entry?.logo, alt = entry?.logoAlt || '', className = '' }) {
  if (!src) return null;
  const [width, height] = DIMENSIONS[src] || [240, 160];
  return (
    <div className={`organization-logo${width / height > 3 ? ' organization-logo-wide' : ''}${className ? ` ${className}` : ''}`}>
      <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 639px) 200px, 240px" />
    </div>
  );
}
