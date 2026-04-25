import { useContext } from 'react';
import { useState } from 'react';
import { Product, CategoryType } from '../types';
import { SAMPLE_PRODUCTS } from './constants';
import { AuthContext, CartContext, OrderContext } from './contexts';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within OrderProvider');
  return context;
}

export function useProducts() {
  const [products] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return {
    products: filteredProducts,
    allProducts: products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  };
}