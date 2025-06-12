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
    name: "Continental GT",
    brand: "Bentley",
    model: "Continental GT V8",
    year: 2024,
    price: 249900,
    images: [
      "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg",
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
      "https://images.pexels.com/photos/3964742/pexels-photo-3964742.jpeg"
    ],
    specs: {
      engine: "4.0L Twin-Turbo V8",
      horsepower: "542 hp",
      acceleration: "0-60 mph in 3.9s",
      topSpeed: "198 mph",
      transmission: "8-Speed Dual Clutch",
      drivetrain: "All-Wheel Drive",
      fuelEconomy: "15/24 mpg",
      seating: "4 seats"
    },
    features: [
      "Diamond-quilted leather interior",
      "Naim for Bentley premium audio",
      "Adaptive cruise control",
      "Panoramic sunroof",
      "Heated and ventilated seats"
    ],
    description: "The Bentley Continental GT represents the pinnacle of luxury grand touring. With its handcrafted interior and powerful V8 engine, it delivers an unparalleled driving experience that seamlessly blends performance with opulence.",
    featured: true
  },
  {
    id: 2,
    name: "S-Class Sedan",
    brand: "Mercedes-Benz",
    model: "S580 4MATIC",
    year: 2024,
    price: 119900,
    images: [
      "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg",
      "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
      "https://images.pexels.com/photos/3752194/pexels-photo-3752194.jpeg"
    ],
    specs: {
      engine: "4.0L Twin-Turbo V8",
      horsepower: "496 hp",
      acceleration: "0-60 mph in 4.4s",
      topSpeed: "130 mph (limited)",
      transmission: "9G-TRONIC Automatic",
      drivetrain: "All-Wheel Drive",
      fuelEconomy: "16/26 mpg",
      seating: "5 seats"
    },
    features: [
      "MBUX infotainment system",
      "Executive rear seating package",
      "Burmester 4D surround sound",
      "Active body control suspension",
      "Massage seats with hot stone therapy"
    ],
    description: "The Mercedes-Benz S-Class sets the standard for luxury sedans worldwide. Every detail has been meticulously crafted to provide the ultimate in comfort, technology, and sophistication.",
    featured: true
  },
  {
    id: 3,
    name: "A8 L",
    brand: "Audi",
    model: "A8 L 60 TFSI quattro",
    year: 2024,
    price: 99900,
    images: [
      "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg",
      "https://images.pexels.com/photos/1719647/pexels-photo-1719647.jpeg",
      "https://images.pexels.com/photos/3945324/pexels-photo-3945324.jpeg"
    ],
    specs: {
      engine: "4.0L Twin-Turbo V8",
      horsepower: "453 hp",
      acceleration: "0-60 mph in 4.6s",
      topSpeed: "155 mph (limited)",
      transmission: "8-Speed Tiptronic",
      drivetrain: "Quattro All-Wheel Drive",
      fuelEconomy: "17/26 mpg",
      seating: "5 seats"
    },
    features: [
      "Virtual Cockpit Plus",
      "Bang & Olufsen 3D sound system",
      "Adaptive air suspension",
      "Matrix LED headlights",
      "Rear seat relaxation package"
    ],
    description: "The Audi A8 L combines cutting-edge technology with refined luxury. Its spacious interior and advanced driver assistance systems make every journey a first-class experience.",
    featured: false
  },
  {
    id: 4,
    name: "Flying Spur",
    brand: "Bentley",
    model: "Flying Spur V8",
    year: 2024,
    price: 229900,
    images: [
      "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg",
      "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
      "https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg"
    ],
    specs: {
      engine: "4.0L Twin-Turbo V8",
      horsepower: "542 hp",
      acceleration: "0-60 mph in 4.0s",
      topSpeed: "198 mph",
      transmission: "8-Speed Dual Clutch",
      drivetrain: "All-Wheel Drive",
      fuelEconomy: "15/23 mpg",
      seating: "5 seats"
    },
    features: [
      "Rotating display",
      "Bentley Dynamic Ride",
      "Wellness seating with massage",
      "Naim for Bentley audio",
      "Mood lighting"
    ],
    description: "The Bentley Flying Spur is a four-door grand tourer that doesn't compromise on performance or luxury. It's the perfect synthesis of power and refinement.",
    featured: true
  },
  {
    id: 5,
    name: "AMG GT 63 S",
    brand: "Mercedes-AMG",
    model: "GT 63 S 4MATIC+",
    year: 2024,
    price: 189900,
    images: [
      "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg",
      "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg",
      "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg"
    ],
    specs: {
      engine: "4.0L Twin-Turbo V8",
      horsepower: "630 hp",
      acceleration: "0-60 mph in 3.1s",
      topSpeed: "196 mph",
      transmission: "9G-SPEEDSHIFT DCT",
      drivetrain: "Performance 4MATIC+",
      fuelEconomy: "15/22 mpg",
      seating: "4 seats"
    },
    features: [
      "AMG Performance seats",
      "AMG Track Pace",
      "Burmester high-end 3D surround",
      "AMG Ride Control+ suspension",
      "Carbon fiber interior trim"
    ],
    description: "The Mercedes-AMG GT 63 S 4MATIC+ is a high-performance luxury coupe that delivers race-track performance with everyday usability.",
    featured: false
  },
  {
    id: 6,
    name: "RS 7 Sportback",
    brand: "Audi",
    model: "RS 7 Sportback",
    year: 2024,
    price: 139900,
    images: [
      "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg",
      "https://images.pexels.com/photos/1719647/pexels-photo-1719647.jpeg",
      "https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg"
    ],
    specs: {
      engine: "4.0L Twin-Turbo V8",
      horsepower: "591 hp",
      acceleration: "0-60 mph in 3.5s",
      topSpeed: "174 mph",
      transmission: "8-Speed Tiptronic",
      drivetrain: "Quattro All-Wheel Drive",
      fuelEconomy: "15/22 mpg",
      seating: "5 seats"
    },
    features: [
      "RS sport exhaust system",
      "Bang & Olufsen advanced sound",
      "RS adaptive air suspension",
      "Virtual Cockpit Plus",
      "Carbon fiber exterior package"
    ],
    description: "The Audi RS 7 Sportback combines the practicality of a five-door with the performance of a supercar. It's the ultimate expression of Audi's sporting DNA.",
    featured: false
  }
];