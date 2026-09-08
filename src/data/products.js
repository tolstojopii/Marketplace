import MacBookImg from "../../public/productImage/MacBook.jpg";
import { Auto } from "./Auto";
import { Books } from "./Books";
import { Electronics } from "./Electronics";
import { Clothes } from "./Clothes";
import { Sport } from "./Sport";
import { House } from "./House";

export const products = [
  ...Electronics.map((item) => ({ ...item, category: "Электроника" })),
  ...Clothes.map((item) => ({ ...item, category: "Одежда" })),
  ...Auto.map((item) => ({ ...item, category: "Авто" })),
  ...Sport.map((item) => ({ ...item, category: "Спорт" })),
  ...House.map((item) => ({ ...item, category: "Дом и сад" })),
  ...Books.map((item) => ({ ...item, category: "Книги" })),
  {
    id: 1,
    name: "Apple MacBook Air 15",
    price: 157395,
    image: MacBookImg,
    rating: 4.8,
    seller: "xcom",
    isPopular: true,
  },
  {
    id: 2,
    name: "Наушники AirPods 4",
    price: 12990,
    image: "/productImage/airpods4.jpg",
    rating: 4.6,
    seller: "AudioShop",
    isPopular: true,
  },
  {
    id: 3,
    name: "Iphone 18 Pro",
    price: 145349,
    image: "/productImage/Iphone.jpg",
    rating: 4.9,
    seller: "MobileWorld",
    isPopular: true,
  },
  {
    id: 4,
    name: "Valentino",
    price: 15989,
    image: "/productImage/Valentino.jpg",
    rating: 4.5,
    seller: "Tsum",
    isPopular: true,
  },
  {
    id: 5,
    name: 'MaisonMargiela"',
    price: 13399,
    image: "/productImage/Maison Margiela.jpg",
    rating: 4.7,
    seller: "Tsum",
    isPopular: true,
  },
  {
    id: 6,
    name: "Comma",
    price: 12490,
    image: "/productImage/Comma.jpg",
    rating: 4.4,
    seller: "GadgetHub",
    isPopular: true,
  },
  {
    id: 7,
    name: "Givanchy",
    price: 12990,
    image: "/productImage/Givanchy.jpg",
    rating: 4.3,
    seller: "FitLife",
    isPopular: true,
  },
  {
    id: 8,
    name: "Le Bouqeut De Mariee",
    price: 57959,
    image: "/productImage/LeBouquet.jpg",
    rating: 4.6,
    seller: "FashionLab",
    isPopular: true,
  },
];
