import { writeFileSync, mkdirSync } from 'fs';
import { Electronics } from '../src/data/Electronics.js';
import { Clothes } from '../src/data/Clothes.js';
import { Auto } from '../src/data/Auto.js';
import { Sport } from '../src/data/Sport.js';
import { House } from '../src/data/House.js';
import { Books } from '../src/data/Books.js';

import {products as merged} from '../../src/data/products.js'
const popular = merged.filter((p) => p.isPopular);

const categories = [
  { name: 'Электроника', slug: 'electronics', items: Electronics },
  { name: 'Одежда', slug: 'clothes', items: Clothes },
  { name: 'Дом и сад', slug: 'house', items: House },
  { name: 'Книги', slug: 'books', items: Books },
  { name: 'Спорт', slug: 'sport', items: Sport },
  { name: 'Авто', slug: 'auto', items: Auto },
];

const out = {
  categories: categories.map(({ name, slug }) => ({ name, slug })),
  products: [
    ...categories.flatMap(({ name, items }) =>
      items.map((p) => ({
        name: p.name,
        price: p.price,
        image: p.image,
        rating: p.rating,
        seller: p.seller,
        category: name,
        isPopular: false,
      }))
    ),
    ...popular.map((p) => ({
      name: p.name,
      price: p.price,
      image: p.image,
      rating: p.rating,
      seller: p.seller,
      category: 'Популярное',
      isPopular: true,
    })),
  ],
};

mkdirSync('server/seeds', { recursive: true });
writeFileSync('server/seeds/products.json', JSON.stringify(out, null, 2));
console.log('Готово:', out.products.length, 'товаров');