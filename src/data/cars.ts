export interface Car {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  images: string[];
  specs: {
    engine: string;
    horsepower: string;
    acceleration: string;
    topSpeed: string;
    transmission: string;
    drivetrain: string;
    fuelEconomy: string;
    seating: string;
  };
  features: string[];
  description: string;
  featured: boolean;
}

export const cars: Car[] = [
  {
    id: 1,
    name: "Ractis",
    brand: "Toyota",
    model: "Ractis G",
    year: 2014,
    price: 950000,
    images: [
      "/images/ractis-1.jpeg",
      "/images/ractis-2.jpeg",
      "/images/ractis-3.jpeg",
      "/images/ractis-4.jpeg",
      "/images/ractis-214-950k.jpeg"
    ],
    specs: {
      engine: "1.5L 4-Cylinder DOHC",
      horsepower: "109 hp",
      acceleration: "0-60 mph in 11.2s",
      topSpeed: "115 mph",
      transmission: "CVT Automatic",
      drivetrain: "Front-Wheel Drive",
      fuelEconomy: "35/40 mpg",
      seating: "5 seats"
    },
    features: [
      "Compact MPV design for city driving",
      "Spacious interior with flexible seating",
      "Power steering and power windows",
      "Air conditioning with climate control",
      "Central locking and keyless entry",
      "Rear parking sensors",
      "Toyota's renowned reliability",
      "Excellent fuel efficiency"
    ],
    description: "The Toyota Ractis is a practical compact MPV that combines the maneuverability of a small hatchback with the spaciousness of a multi-purpose vehicle. Perfect for urban driving and small families, it offers excellent fuel economy and Toyota's legendary reliability.",
    featured: true
  },
  {
    id: 2,
    name: "Harrier",
    brand: "Toyota",
    model: "Harrier Premium",
    year: 2014,
    price: 2700000,
    images: [
      "/images/harrier-1.jpeg",
      "/images/harrier-2.jpeg",
      "/images/harrier-2014-2.7M.jpeg",
      "/images/harrier-2014-2.7M-2.jpeg"
    ],
    specs: {
      engine: "2.0L 4-Cylinder DOHC",
      horsepower: "151 hp",
      acceleration: "0-60 mph in 9.8s",
      topSpeed: "124 mph",
      transmission: "CVT Automatic",
      drivetrain: "All-Wheel Drive",
      fuelEconomy: "28/32 mpg",
      seating: "5 seats"
    },
    features: [
      "Premium leather interior",
      "Dual-zone automatic climate control",
      "8-inch touchscreen infotainment system",
      "JBL premium audio system",
      "Power-adjustable heated front seats",
      "LED headlights and taillights",
      "Panoramic sunroof",
      "Advanced safety features",
      "Parking sensors and backup camera",
      "Smart key system with push-button start"
    ],
    description: "The Toyota Harrier is a sophisticated luxury crossover SUV that embodies 'elegant velocity'. With its bold design, premium interior, and advanced technology, it offers the perfect blend of style, comfort, and performance for discerning drivers.",
    featured: true
  }
];