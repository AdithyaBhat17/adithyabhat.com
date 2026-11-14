// Cuts the café painting into a top cap, a repeatable middle band and a bottom
// cap, so the "Kind words" table can grow to fit any number of notes.
import sharp from 'sharp';
const src = 'src/assets/paintings/cafe.png';
const out = 'src/assets/paintings';
await sharp(src).extract({ left: 0, top: 0, width: 1440, height: 200 }).png().toFile(`${out}/cafe-top.png`);
await sharp(src).extract({ left: 0, top: 560, width: 1440, height: 200 }).png().toFile(`${out}/cafe-bottom.png`);
// A plank-aligned band from the middle of the table.
await sharp(src).extract({ left: 0, top: 240, width: 1440, height: 260 }).png().toFile(`${out}/cafe-mid.png`);
console.log('cafe table parts written');
