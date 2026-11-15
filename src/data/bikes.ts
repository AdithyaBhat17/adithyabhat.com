// The bikes as split by scripts/art/make-hero-ride.mjs: four layers on one
// 400x256 canvas (src/assets/ride/bike-<key>-<part>.png). Wheel pivots are the
// hub centres as percentages of that canvas, so the wheels can turn in place.

export type BikeKey = 'ktm' | 'cb';
export const BIKE_PARTS = ['shadow', 'wheelRear', 'wheelFront', 'body'] as const;

export const BIKES: Record<BikeKey, { rear: string; front: string }> = {
  ktm: { rear: '20.4% 76%', front: '81.5% 74.2%' },
  cb: { rear: '23.4% 76.8%', front: '79.6% 77.9%' },
};
