import { Product, CategoryType } from '../types';

export const CATEGORIES: { id: CategoryType; name: string; emoji: string }[] = [
  { id: 'vegetables', name: 'Vegetables', emoji: '🥬' },
  { id: 'fruits', name: 'Fruits', emoji: '🍎' },
  { id: 'dairy', name: 'Dairy', emoji: '🥛' },
  { id: 'snacks', name: 'Snacks', emoji: '🍪' },
  { id: 'grains', name: 'Grains', emoji: '🍚' },
];

export const SAMPLE_PRODUCTS: Product[] = [
  { id: '1', name: 'Onion', price: 30, unit: '1kg', category: 'vegetables', image: '🧅', description: 'Fresh red onions', inStock: true },
  { id: '2', name: 'Potato', price: 25, unit: '1kg', category: 'vegetables', image: '🥔', description: 'Premium quality potatoes', inStock: true },
  { id: '3', name: 'Tomato', price: 40, unit: '1kg', category: 'vegetables', image: '🍅', description: 'Ripe red tomatoes', inStock: true },
  { id: '4', name: 'Carrot', price: 35, unit: '500g', category: 'vegetables', image: '🥕', description: 'Fresh orange carrots', inStock: true },
  { id: '5', name: 'Cabbage', price: 20, unit: '1pc', category: 'vegetables', image: '🥬', description: 'Green cabbage head', inStock: true },
  { id: '6', name: 'Apple', price: 120, unit: '1kg', category: 'fruits', image: '🍎', description: 'Himachali apples', inStock: true },
  { id: '7', name: 'Banana', price: 50, unit: '1dozen', category: 'fruits', image: '🍌', description: 'Fresh yellow bananas', inStock: true },
  { id: '8', name: 'Orange', price: 80, unit: '1kg', category: 'fruits', image: '🍊', description: 'Nagpur oranges', inStock: true },
  { id: '9', name: 'Mango', price: 150, unit: '1kg', category: 'fruits', image: '🥭', description: 'Alphonso mangoes', inStock: true },
  { id: '10', name: 'Milk', price: 60, unit: '1L', category: 'dairy', image: '🥛', description: 'Full cream milk', inStock: true },
  { id: '11', name: 'Cheese', price: 120, unit: '200g', category: 'dairy', image: '🧀', description: 'Cheddar cheese slices', inStock: true },
  { id: '12', name: 'Butter', price: 55, unit: '100g', category: 'dairy', image: '🧈', description: 'Salted butter', inStock: true },
  { id: '13', name: 'Yogurt', price: 40, unit: '400g', category: 'dairy', image: '🥛', description: 'Greek yogurt', inStock: true },
  { id: '14', name: 'Chips', price: 30, unit: '1pack', category: 'snacks', image: '🥔', description: 'Masala chips', inStock: true },
  { id: '15', name: 'Cookies', price: 50, unit: '200g', category: 'snacks', image: '🍪', description: 'Chocolate cookies', inStock: true },
  { id: '16', name: 'Nuts Mix', price: 180, unit: '250g', category: 'snacks', image: '🥜', description: 'Mixed dry fruits', inStock: true },
  { id: '17', name: 'Rice', price: 350, unit: '5kg', category: 'grains', image: '🍚', description: 'Basmati rice', inStock: true },
  { id: '18', name: 'Wheat Flour', price: 45, unit: '1kg', category: 'grains', image: '🌾', description: 'Whole wheat atta', inStock: true },
  { id: '19', name: 'Dal', price: 140, unit: '1kg', category: 'grains', image: '🫘', description: 'Toor dal', inStock: true },
];

export const DELIVERY_FEE = 40;
export const TAX_RATE = 0.05;