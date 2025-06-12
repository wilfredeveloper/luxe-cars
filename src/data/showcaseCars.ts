export interface ShowcaseCar {
  id: string;
  name: string;
  model: string;
  brand: string;
  backgroundImage: string;
  features: string[];
  description: string;
  price: string;
  category: string;
}

// Mapping from showcase car IDs to car detail page IDs
export const showcaseToCarIdMapping: Record<string, number> = {
  "bentley-continental": 1, // Maps to Bentley Continental GT in cars.ts
  "lamborghini-huracan": 5, // Maps to Mercedes-AMG GT 63 S (closest performance match)
  "range-rover-autobiography": 3, // Maps to Audi A8 L (luxury sedan alternative)
  "porsche-911-turbo": 4, // Maps to Bentley Flying Spur (luxury performance)
};

export const showcaseCars: ShowcaseCar[] = [
  {
    id: "bentley-continental",
    name: "Continental GT",
    model: "V8 Coupe",
    brand: "Bentley",
    backgroundImage: "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg",
    features: [
      "4.0L Twin-Turbo V8 Engine",
      "542 HP & 568 lb-ft Torque",
      "Diamond-Quilted Leather Interior",
      "Naim Premium Audio System"
    ],
    description: "The epitome of luxury grand touring, combining handcrafted excellence with modern performance.",
    price: "$249,900",
    category: "Grand Tourer"
  },
  {
    id: "lamborghini-huracan",
    name: "Huracán",
    model: "EVO Spyder",
    brand: "Lamborghini",
    backgroundImage: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg",
    features: [
      "5.2L V10 Naturally Aspirated",
      "630 HP & 443 lb-ft Torque",
      "0-60 mph in 3.1 seconds",
      "Advanced Aerodynamics Package"
    ],
    description: "Pure Italian passion meets cutting-edge technology in this open-top supercar masterpiece.",
    price: "$287,400",
    category: "Supercar"
  },
  {
    id: "range-rover-autobiography",
    name: "Range Rover",
    model: "Autobiography",
    brand: "Land Rover",
    backgroundImage: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg",
    features: [
      "5.0L Supercharged V8",
      "518 HP & 461 lb-ft Torque",
      "Meridian Signature Sound System",
      "Terrain Response 2 Technology"
    ],
    description: "Uncompromising luxury meets legendary capability in the world's most refined SUV.",
    price: "$104,500",
    category: "Luxury SUV"
  },
  {
    id: "porsche-911-turbo",
    name: "911 Turbo S",
    model: "Cabriolet",
    brand: "Porsche",
    backgroundImage: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    features: [
      "3.8L Twin-Turbo Flat-6",
      "640 HP & 590 lb-ft Torque",
      "PDK 8-Speed Transmission",
      "Active Suspension Management"
    ],
    description: "The ultimate expression of sports car engineering with open-air exhilaration.",
    price: "$230,400",
    category: "Sports Car"
  }
];
