// "Lately": the still-life shelf. One line per object, in Adithya's words,
// about when he reaches for it. Positions are in the 1120 × 619 stage's
// Figma coordinates (top-left of each object's render).
//
// TODO(adithya): the perfume notes were guesses in the Figma spec
// ("[Brackets] are guesses, swap in yours"). Edit them here.

import type { ImageMetadata } from 'astro';
import helmet from '@/assets/stilllife/helmet.png';
import imagination from '@/assets/stilllife/perfume-imagination.png';
import hacivat from '@/assets/stilllife/perfume-hacivat.png';
import ombre from '@/assets/stilllife/perfume-ombre-nomade.png';
import espresso from '@/assets/stilllife/espresso-machine.png';
import moka from '@/assets/stilllife/moka-pot.png';
import dumbbell from '@/assets/stilllife/dumbbell.png';
import watch from '@/assets/stilllife/watch.png';

export interface ShelfItem {
  id: string;
  name: string;
  /** Hover note. Leave out for objects that shouldn't get one. */
  note?: string;
  img: ImageMetadata;
  x: number;
  y: number;
  /** Which way the note hangs from the object. */
  align?: 'left' | 'right';
  /** Clicking plays this sound (easter egg). */
  sound?: string;
}

// Listed bottom → top, matching the painting's stacking.
export const SHELF: ShelfItem[] = [
  { id: 'helmet', name: 'Airoh Commander 2', note: 'the lid that’s seen every trail', img: helmet, x: 78, y: 172 },
  { id: 'imagination', name: 'Louis Vuitton Imagination', note: 'my daytime one, mostly office days', img: imagination, x: 397, y: 284 },
  { id: 'hacivat', name: 'Nishane Hacivat', note: 'the weekend one, goes anywhere', img: hacivat, x: 481, y: 285 },
  { id: 'ombre', name: 'Louis Vuitton Ombre Nomade', note: 'saved for cooler evenings out', img: ombre, x: 435, y: 264 },
  { id: 'espresso', name: 'Espresso machine', note: 'weekend shots, still dialling it in', img: espresso, x: 629, y: 207, sound: 'pour' },
  { id: 'moka', name: 'Moka pot', note: 'weekday mornings', img: moka, x: 540, y: 277, sound: 'pour' },
  { id: 'dumbbell', name: 'Dumbbell', img: dumbbell, x: 871, y: 346, align: 'right' },
  { id: 'watch', name: 'Seiko Alpinist', note: 'the green one, compass and all', img: watch, x: 775, y: 294, align: 'right' },
];
