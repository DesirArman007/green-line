export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: 'travel' | 'tips' | 'tours';
  image: string;
  readTime: string;
  author: string;
  featured?: boolean;
}

export const categoryLabels: Record<string, string> = {
  all: 'All Posts',
  travel: 'Travel Guides',
  tips: 'Tips & Hacks',
  tours: 'Temple Tours',
};

export const blogPosts: BlogPost[] = [
  {
    id: 'scenic-getaways-vijayawada',
    title: 'Top 5 Scenic Weekend Getaways from Vijayawada',
    excerpt: 'Escape the city hustle with these five beautiful and tranquil weekend destination ideas close to Vijayawada.',
    date: 'June 25, 2026',
    category: 'travel',
    image: '/images/video_thumb_scenic.png',
    readTime: '5 min read',
    author: 'Rohan Sharma',
    featured: true,
    content: `
      Vijayawada, nestled on the banks of the Krishna River, is a vibrant and bustling city. However, sometimes we all need a break from the daily routine to recharge. Fortunately, there are several incredible destinations just a short drive away that are perfect for a weekend escape.

      Here are our top 5 scenic getaways from Vijayawada:

      ### 1. Kondapalli Fort (25 km away)
      Famous for its iconic handmade wooden toys, Kondapalli also houses a magnificent 14th-century fort. Nestled among lush green hills, it offers a great trek and panoramic views of the valley.

      ### 2. Amaravati Heritage Town (40 km away)
      Step back in time by visiting the ancient Buddhist site of Amaravati. Explore the Amareswara Temple, the ancient Stupa, and the peaceful museum, all located along the scenic Krishna riverbanks.

      ### 3. Mangalagiri Hills (12 km away)
      Famous for the Panakala Narasimha Swamy temple on the hill and beautiful handloom sarees, Mangalagiri is a spiritual and cultural delight with excellent panoramic vantage points.

      ### 4. Hamsaladeevi (95 km away)
      This is the magical spot where the Krishna River meets the Bay of Bengal. The pristine beaches and the calm environment make it an amazing road-trip destination for nature lovers.

      ### 5. Kolleru Lake & Bird Sanctuary (75 km away)
      One of India’s largest freshwater lakes, Kolleru is a haven for migratory birds. Visit during the cooler months to witness thousands of painted storks, pelicans, and herons.

      No matter which destination you choose, renting a comfortable AC Sedan or SUV ensures your family travels in absolute comfort without the stress of driving.
    `,
  },
  {
    id: 'temple-tour-guide-ap',
    title: 'A Complete Guide to Planning the Perfect Temple Tour',
    excerpt: 'Essential tips and customized itineraries for exploring the sacred temples of Andhra Pradesh in comfort.',
    date: 'June 18, 2026',
    category: 'tours',
    image: '/images/video_thumb_tirupati.png',
    readTime: '8 min read',
    author: 'Anjali Rao',
    featured: true,
    content: `
      Andhra Pradesh is a land of rich spiritual heritage, housing some of the oldest and most revered temples in India. Planning a pilgrimage tour with family requires careful preparation, especially when traveling with children or elderly members.

      To help you plan a smooth and stress-free temple tour, we have put together this essential guide:

      ### 1. Booking Darshans in Advance
      Most popular temples, such as Tirumala, Dwaraka Tirumala, and Srisailam, offer online portals for booking Special Entry Darshan (SED) tickets. Always book these weeks in advance to avoid long waiting times.

      ### 2. Choosing the Right Travel Partner
      Pilgrimage journeys can be physically exhausting. Having a private, air-conditioned vehicle with a professional driver allows you to rest between destinations, keep your luggage secure, and avoid the hassle of public transport.

      ### 3. Recommended Itinerary from Vijayawada
      - **Day 1**: Visit Mangalagiri (Panakala Narasimha Swamy) in the morning, followed by Amaravati (Amareswara Temple).
      - **Day 2**: Travel to Dwaraka Tirumala (Chinna Tirupati) for a peaceful hilltop darshan.
      - **Day 3**: Drive to Mopidevi Subrahmanya Swamy Temple, returning via the beautiful Sri Durga Malleswara Swamy Varla Devasthanam (Kanakadurga Temple) in Vijayawada.

      ### 4. What to Pack
      - Traditional dress code clothing (strictly required at many temples).
      - Reusable water bottles and light snacks.
      - Hand sanitizer and wet wipes.
      
      We specialize in tailored pilgrimage packages. Our chauffeurs are familiar with temple protocols, parking zones, and local dining options, ensuring your focus remains entirely on your spiritual journey.
    `,
  },
  {
    id: 'professional-chauffeur-benefits',
    title: 'Why Hiring a Chauffeur is Ideal for Outstation Trips',
    excerpt: 'From safety to stress-free navigation, discover why a dedicated chauffeur makes all the difference on long road trips.',
    date: 'June 10, 2026',
    category: 'tips',
    image: '/images/video_thumb_airport.png',
    readTime: '4 min read',
    author: 'Vikram Reddy',
    featured: true,
    content: `
      When planning a family vacation or an important outstation business trip, the choice of transportation is critical. While self-driving might seem fun on paper, long-distance driving on highways can be exhausting and stressful. 

      Here is why hiring a professional chauffeur-driven car is the smarter choice for your next journey:

      ### 1. Stress-Free Travel
      Instead of worrying about traffic, highway diversions, navigation, and road safety, you can sit back, catch up on work, read a book, or spend quality time conversing with your family.

      ### 2. Safety and Local Expertise
      Professional drivers are trained for highway safety, understand speed limits, and are experienced in handling diverse weather and road conditions. Moreover, they know the best routes, shortcuts, and the cleanest restaurants along the way.

      ### 3. No Parking Hassles
      Finding parking near crowded tourist spots, temples, or city centers can be incredibly frustrating. With a chauffeur, you are dropped off right at the entrance, and the driver handles the parking.

      ### 4. Cost and Energy Efficiency
      When you self-drive, you arrive at your destination tired and needing rest. A chauffeur-driven travel experience allows you to start your meetings or sightseeing immediately upon arrival, saving precious time.

      At GreenLine, all our drivers are fully verified, English/Telugu-speaking, and highly experienced in outstation route management. Book your ride today and experience the difference!
    `,
  },
];
