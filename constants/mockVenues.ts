// constants/mockVenues.ts

export type VenueCategory = 'cafe' | 'bar' | 'park' | 'museum' | 'restaurant';

export type Venue = {
  id: string;
  name: string;
  category: VenueCategory;
  neighborhood: string;
  shortVibe: string;
  description: string;
  address: string;
  hours: string;
  tags: string[];
};

export const MOCK_VENUES: Venue[] = [
  {
    id: '1',
    name: 'Saturn Café',
    category: 'cafe',
    neighborhood: 'Centro',
    shortVibe: 'Quiet corner café with strong coffee and soft jazz.',
    description:
      'A tiny café tucked on a side street. Good light, small tables, and the kind of background music that lets you think.',
    address: '123 Orbit St, Centro',
    hours: 'Mon–Sun · 8:00–20:00',
    tags: ['coffee', 'cozy', 'laptop friendly', 'soft music'],
  },
  {
    id: '2',
    name: 'Ellipse Natural Wine Bar',
    category: 'bar',
    neighborhood: 'Riverside',
    shortVibe: 'Narrow natural wine bar with candlelight and good conversations.',
    description:
      'A bar that feels like a living room. Low ceilings, worn wood, and a chalkboard wine list that changes weekly.',
    address: '45 River Ln, Riverside',
    hours: 'Wed–Sun · 17:00–01:00',
    tags: ['wines', 'intimate', 'date night', 'low light'],
  },
  {
    id: '3',
    name: 'Aphelion Park',
    category: 'park',
    neighborhood: 'Northside',
    shortVibe: 'Wide open park with long walking paths and big sky.',
    description:
      'A park Cleo keeps returning to on Sunday afternoons. Good for walking, thinking, and people-watching.',
    address: 'Parkway Ave, Northside',
    hours: 'Open 24 hours',
    tags: ['green', 'walks', 'sunset', 'family friendly'],
  },
];
