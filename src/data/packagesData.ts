export interface TourPackage {
  id: string;
  name: string;
  destination: string;
  duration: string;
  days: number;
  nights: number;
  price: string;
  priceValue: number;
  vehicle: string;
  image: string;
  highlights: string[];
  category: 'weekend' | 'long-tour' | 'pilgrimage';
  featured: boolean;
  description: string;
}

export const tourPackages: TourPackage[] = [
  {
    id: 'dwaraka-tirumala',
    name: 'Dwaraka Tirumala Darshan',
    destination: 'Dwaraka Tirumala (Chinna Tirupati)',
    duration: '1 Day',
    days: 1,
    nights: 0,
    price: '₹3,999',
    priceValue: 3999,
    vehicle: 'AC Sedan',
    image: '/images/packages/dwaraka-tirumala.png',
    highlights: [
      'Lord Venkateswara Temple VIP Darshan assistance',
      'Door-to-door AC Sedan travel with professional driver',
      'Optional stop at local scenic spots & temples',
    ],
    category: 'pilgrimage',
    featured: true,
    description:
      'Visit the sacred hill temple of Dwaraka Tirumala, dedicated to Lord Venkateswara. Our 1-day package offers a smooth, comfortable ride with customizable itinerary timings, ideal for families and elderly pilgrims.',
  },
  {
    id: 'mopidevi-temple',
    name: 'Mopidevi Subrahmanya Swamy Tour',
    destination: 'Mopidevi',
    duration: '1 Day',
    days: 1,
    nights: 0,
    price: '₹2,999',
    priceValue: 2999,
    vehicle: 'AC Sedan',
    image: '/images/packages/mopidevi.png',
    highlights: [
      'Sri Subrahmanya Swamy Temple Darshan',
      'Penuganchiprolu & nearby temples visit',
      'Comfortable, stress-free private cab journey',
    ],
    category: 'pilgrimage',
    featured: true,
    description:
      'Seek blessings at the historical Mopidevi temple, famous for Lord Subrahmanya Swamy. Enjoy a peaceful and comfortable journey with a dedicated cab and driver at your service throughout the day.',
  },
  {
    id: 'bandar-beach',
    name: 'Bandar Beach & Machilipatnam Heritage',
    destination: 'Manginapudi (Bandar) Beach',
    duration: '1 Day',
    days: 1,
    nights: 0,
    price: '₹2,999',
    priceValue: 2999,
    vehicle: 'AC Sedan',
    image: '/images/packages/bandar-beach.png',
    highlights: [
      'Relaxing time at scenic Manginapudi Beach',
      'Historic Panduranga Swamy Temple Darshan',
      'Buy famous Bandar Laddu & local sweet tastings',
    ],
    category: 'weekend',
    featured: true,
    description:
      'Unwind at the unique black-soil Manginapudi Beach near Machilipatnam. This package combines beach leisure, cultural heritage at the Panduranga Swamy temple, and delicious local sweet tastings.',
  },
  {
    id: 'srisailam-tour',
    name: 'Srisailam Jyotirlinga Devotional Tour',
    destination: 'Srisailam',
    duration: '2D / 1N',
    days: 2,
    nights: 1,
    price: '₹8,499',
    priceValue: 8499,
    vehicle: 'AC SUV',
    image: '/images/packages/srisailam.png',
    highlights: [
      'Mallikarjuna Swamy Jyotirlinga & Shakti Peetha Darshan',
      'Scenic Nallamala Forest road drive & Sakshi Ganapathi',
      'Pathala Ganga Ropeway, Srisailam Dam & boating',
    ],
    category: 'pilgrimage',
    featured: true,
    description:
      'Journey to the top of the flat Srisailam hills. This 2-day package covers the divine Mallikarjuna Swamy Temple, Bhramaramba Devi Temple, scenic views of the Krishna river, and a thrilling drive through the Nallamala forest.',
  },
  {
    id: 'annavaram-darshan',
    name: 'Annavaram Satyanarayana Swamy Tour',
    destination: 'Annavaram',
    duration: '1 Day',
    days: 1,
    nights: 0,
    price: '₹6,999',
    priceValue: 6999,
    vehicle: 'AC Sedan',
    image: '/images/packages/annavaram.png',
    highlights: [
      'Sri Satyanarayana Swamy Vratam on Ratnagiri Hills',
      'Comfortable highway drive on NH-16',
      'Scenic Pampa River view & local temple stops',
    ],
    category: 'pilgrimage',
    featured: false,
    description:
      'Perform the sacred Satyanarayana Swamy Vratam at the famous hill temple of Annavaram. Travel in luxury and convenience with our door-to-door cab service, leaving you free to focus entirely on your devotion.',
  },
  {
    id: 'pancharamalu-tour',
    name: 'Pancharama Kshetras Pilgrimage',
    destination: 'Amaravati, Bhimavaram, Palakollu, Draksharamam, Samalkot',
    duration: '3D / 2N',
    days: 3,
    nights: 2,
    price: '₹8,999',
    priceValue: 8999,
    vehicle: 'AC Sedan / SUV',
    image: '/images/packages/pancharamalu.png',
    highlights: [
      'Cover all 5 holy Pancharama Shiva Temples in AP',
      'Perfect itinerary planned for optimal travel time',
      'Experienced driver with extensive pilgrimage route knowledge',
    ],
    category: 'long-tour',
    featured: false,
    description:
      'Embark on a sacred journey to the five powerful temples dedicated to Lord Shiva in Andhra Pradesh (Amararama, Somarama, Ksheerarama, Kumararama, and Bhimarama). We manage the route efficiently so you can complete your rituals smoothly.',
  },
  {
    id: 'local-tour',
    name: 'Vijayawada Local Highlights',
    destination: 'Vijayawada & Around',
    duration: '1 Day (8 Hrs / 80 Kms)',
    days: 1,
    nights: 0,
    price: '₹2,999',
    priceValue: 2999,
    vehicle: 'AC Sedan',
    image: '/images/packages/local-tour.png',
    highlights: [
      'Kanakadurga Hilltop Temple & Undavalli Rock-Cut Caves',
      'Prakasam Barrage & Bhavani Island scenic stops',
      'Bapu Museum & local shopping markets',
    ],
    category: 'weekend',
    featured: false,
    description:
      'Discover the best of Vijayawada in a single day. Ideal for business visitors and tourists alike, this package covers key historical, religious, and natural landmarks around the city.',
  },
];

export const categoryLabels: Record<string, string> = {
  all: 'All Packages',
  weekend: 'Weekend Getaways',
  'long-tour': 'Long Tours',
  pilgrimage: 'Pilgrimage',
};
