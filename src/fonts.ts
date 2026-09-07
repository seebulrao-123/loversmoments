export interface FontOption {
  name: string;
  family: string;
  category: 'Handwritten' | 'Calligraphy' | 'Vintage Typewriter' | 'Elegant Serif' | 'Casual Handwriting';
}

export const VINTAGE_FONTS: FontOption[] = [
  // Calligraphy & Elegant
  { name: 'Great Vibes', family: "'Great Vibes', cursive", category: 'Calligraphy' },
  { name: 'Alex Brush', family: "'Alex Brush', cursive", category: 'Calligraphy' },
  { name: 'Parisienne', family: "'Parisienne', cursive", category: 'Calligraphy' },
  { name: 'Pinyon Script', family: "'Pinyon Script', cursive", category: 'Calligraphy' },
  { name: 'Sacramento', family: "'Sacramento', cursive", category: 'Calligraphy' },
  { name: 'Dancing Script', family: "'Dancing Script', cursive", category: 'Calligraphy' },

  // Handwritten & Cursive
  { name: 'Caveat', family: "'Caveat', cursive", category: 'Handwritten' },
  { name: 'Kalam', family: "'Kalam', cursive", category: 'Handwritten' },
  { name: 'Patrick Hand', family: "'Patrick Hand', cursive", category: 'Handwritten' },
  { name: 'Shadows Into Light', family: "'Shadows Into Light', cursive", category: 'Handwritten' },
  { name: 'Indie Flower', family: "'Indie Flower', cursive", category: 'Handwritten' },
  { name: 'Homemade Apple', family: "'Homemade Apple', cursive", category: 'Handwritten' },
  { name: 'Reenie Beanie', family: "'Reenie Beanie', cursive", category: 'Casual Handwriting' },
  { name: 'Cedarville Cursive', family: "'Cedarville Cursive', cursive", category: 'Casual Handwriting' },
  { name: 'La Belle Aurore', family: "'La Belle Aurore', cursive", category: 'Casual Handwriting' },
  { name: 'Just Another Hand', family: "'Just Another Hand', cursive", category: 'Casual Handwriting' },

  // Vintage Typewriter
  { name: 'Special Elite', family: "'Special Elite', cursive", category: 'Vintage Typewriter' },
  { name: 'Courier Prime', family: "'Courier Prime', monospace", category: 'Vintage Typewriter' },

  // Classic & Elegant Serif
  { name: 'Cinzel Decorative', family: "'Cinzel Decorative', serif", category: 'Elegant Serif' },
  { name: 'Cormorant Garamond', family: "'Cormorant Garamond', serif", category: 'Elegant Serif' },
  { name: 'EB Garamond', family: "'EB Garamond', serif", category: 'Elegant Serif' },
  { name: 'Libre Baskerville', family: "'Libre Baskerville', serif", category: 'Elegant Serif' },
  { name: 'Marcellus', family: "'Marcellus', serif", category: 'Elegant Serif' },
];

export const VINTAGE_PHRASES = [
  'Moments..',
  'Beautiful Moments..',
  'Our Moments..',
  'You + Me',
  'Some moments become memories..',
  'Once upon a time..',
  'Treasured Whispers',
  'Golden Hours',
  'Remember this day..',
  'Forever in my heart',
  'A chapter to remember',
  'Unforgettable times..',
];
