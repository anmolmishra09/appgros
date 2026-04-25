export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: CategoryType;
  image: string;
  description: string;
  inStock: boolean;
}

export type CategoryType = 'vegetables' | 'fruits' | 'dairy' | 'snacks' | 'grains';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'delivered';
  paymentMethod: PaymentMethod;
  createdAt: Date;
  deliveryAddress: Address;
}

export type PaymentMethod = 'upi' | 'card' | 'cod';

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PaymentDetails {
  method: PaymentMethod;
  upiId?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
}