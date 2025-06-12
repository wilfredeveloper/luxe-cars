export interface FeaturedCar {
  id: string;
  title: string;
  price: string;
  image: string;
  description: string;
  category: string;
}

export const featuredCars: FeaturedCar[] = [
  {
    id: "luxury-sedan",
    title: "LUXURY SEDAN",
    price: "$55,000",
    image: "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg",
    description: "Premium comfort meets exceptional performance in this stunning luxury sedan",
    category: "Sedan"
  },
  {
    id: "sports-coupe",
    title: "SPORTS COUPE",
    price: "$75,000",
    image: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg",
    description: "Unleash the thrill of pure driving excitement with precision engineering",
    category: "Sports"
  },
  {
    id: "luxury-suv",
    title: "LUXURY SUV",
    price: "$85,000",
    image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg",
    description: "Commanding presence with unmatched versatility and premium comfort",
    category: "SUV"
  },
  {
    id: "convertible",
    title: "CONVERTIBLE",
    price: "$95,000",
    image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    description: "Open-air luxury for the ultimate driving experience with style",
    category: "Convertible"
  },
  {
    id: "hatchback",
    title: "HATCHBACK",
    price: "$45,000",
    image: "https://images.pexels.com/photos/1719647/pexels-photo-1719647.jpeg",
    description: "Compact efficiency with premium features and modern design",
    category: "Hatchback"
  },
  {
    id: "electric-suv",
    title: "ELECTRIC SUV",
    price: "$75,000",
    image: "https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg",
    description: "Sustainable luxury for the future with zero-emission technology",
    category: "Electric"
  }
];
