// Kind words from people I've worked with. The first four sit on the café table
// on the home page, in this order: napkin, receipt, napkin, napkin.

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** How it's written down on the table. */
  paper?: 'napkin' | 'receipt';
}

export const TESTIMONIALS: Testimonial[] = [
  { quote: 'His passion for UX and UI design combined with his passion for web development is a deadly combination. He can convert any low-fidelity wireframe into a beautiful looking end product.', name: 'Bapusaheb Patil', role: 'Head of AI & Design Engineering', company: 'Fluence', paper: 'napkin' },
  { quote: 'It was amazing to work with him — the work was remote and there was no setback. I would definitely recommend it!', name: 'José Mosso', role: 'Co-Founder', company: 'Homero', paper: 'receipt' },
  { quote: 'His technical proficiency and domain expertise are remarkable. What sets him apart is his ability to swiftly make decisions, never compromising on quality or efficiency.', name: 'Akshay Bhat', role: 'Product Manager', company: 'yellow.ai', paper: 'napkin' },
  { quote: 'One of the finest and most creative UI Developers I’ve interacted with. He has the acumen to recreate your designs flawlessly and suggest improvements.', name: 'Nikhil Suresh', role: 'Senior Software Engineer', company: 'Morningstar', paper: 'napkin' },
  { quote: 'He invests a lot of time coming up with amazing UI designs and would definitely be an asset to any company. His skills in React and UI design are amazing and rare to find in one.', name: 'Gautam Krishnan', role: 'SWE (IC-3)', company: 'ServiceNow', paper: 'napkin' },
  { quote: 'He designs excellent front end for web and his concern to keep the UI and UX the best is an add-on. If you are seeking a web developer or a front end specialist, Adithya would be the best choice.', name: 'Madana Krishnan', role: 'Senior Data Scientist 2', company: 'Quantumblack, McKinsey', paper: 'napkin' },
  { quote: 'It’s rare to come across a standout talent like Adithya. I have worked with him on a few projects and I’m amazed at his work. He’s a good asset for any company.', name: 'Saiprasanth R.', role: 'Principal Engineer', company: 'Navatech', paper: 'napkin' },
];
