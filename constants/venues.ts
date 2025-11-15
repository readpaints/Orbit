// constants/venues.ts

export type Venue = {
  id: string;
  name: string;
  neighborhood: string;
  category: string;
  tags: string[];
};

export const VENUES: Venue[] = [
  {
    id: 'cafe-fantastico',
    name: 'Café Fantástico',
    neighborhood: 'Malasaña',
    category: 'Café',
    tags: ['cozy', 'great coffee', 'good for reading'],
  },
  {
    id: 'vino-y-vela',
    name: 'Vino y Vela',
    neighborhood: 'La Latina',
    category: 'Wine Bar',
    tags: ['intimate', 'natural wine', 'date spot'],
  },
  {
    id: 'pan-y-sombras',
    name: 'Pan y Sombras',
    neighborhood: 'Lavapiés',
    category: 'Bakery',
    tags: ['croissants', 'morning spot', 'good for kids'],
  },
  {
    id: 'galeria-orbita',
    name: 'Galería Órbita',
    neighborhood: 'Chueca',
    category: 'Gallery',
    tags: ['contemporary art', 'evening openings'],
  },
  {
    id: 'parque-del-dia',
    name: 'Parque del Día',
    neighborhood: 'Retiro',
    category: 'Park',
    tags: ['stroller friendly', 'sunset walks', 'picnic'],
  },
];
