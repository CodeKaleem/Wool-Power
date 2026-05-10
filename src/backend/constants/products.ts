export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Rose Blossom Shoulder Bag",
    price: 4500,
    category: "Accessories",
    image: "/crochet_bag.jpg",
  },
  {
    id: 2,
    name: "Vintage Pearl Sweater",
    price: 8900,
    category: "Clothing",
    image: "/crochet_sweater.jpg",
  },
  {
    id: 3,
    name: "Petal Soft Plushie",
    price: 2500,
    category: "Toys",
    image: "/crochet_plushie.jpg",
  },
  {
    id: 4,
    name: "Boho Wall Hanging",
    price: 3200,
    category: "Home Decor",
    image: "/crochet_decor.jpg",
  },
];
