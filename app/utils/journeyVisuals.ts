export interface MilestonePhoto {
  src: string
  alt: string
  width: number
  height: number
  sizes: string
}

// The milestone photographs live inside the flipbook, which only mounts its
// pages in the browser after a journal is opened. Their source, dimensions and
// `sizes` therefore have to live in one shared place: JourneyPage renders them
// on demand, while SectionJourney renders the same records once in a hidden
// prerender inventory so the `ipxStatic` provider generates the exact variants
// the flipbook later requests.
export const milestonePhotos: Record<string, MilestonePhoto> = {
  serious: {
    src: '/images/keyza.webp',
    alt: 'Portrait photograph of Keyza',
    width: 320,
    height: 426,
    sizes: 'xs:140px sm:200px',
  },
  lks2025: {
    src: '/images/lks-pplg-2025-tasikzone.jpg',
    alt: 'Participants working at laptops during the LKS PPLG Kota Tasikmalaya 2025 competition.',
    width: 480,
    height: 360,
    sizes: 'xs:220px sm:300px',
  },
  lks2026: {
    src: '/images/lks-pplg-2025-radartasik.webp',
    alt: 'Participants taking part in the LKS PPLG Kota Tasikmalaya competition at SMK BPN.',
    width: 480,
    height: 360,
    sizes: 'xs:200px sm:280px',
  },
}

export const journeyPhotos = Object.values(milestonePhotos)
