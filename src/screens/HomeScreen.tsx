import { useState } from 'react';
import { useProducts, useCart } from '../utils/hooks';
import { ProductCard } from '../components/ProductCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { Header } from '../components/Header';
import { CartDrawer } from '../components/CartDrawer';
import { PaymentModal } from '../components/PaymentModal';
import { CategoryType } from '../types';

interface HomeScreenProps {
  onProfileClick: () => void;
  onOrdersClick: () => void;
  onOrderSuccess: () => void;
}

export function HomeScreen({ onProfileClick, onOrdersClick, onOrderSuccess }: HomeScreenProps) {
  const { products, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useProducts();
  const { items } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: CategoryType | null) => {
    setSelectedCategory(category);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPaymentOpen(false);
    onOrderSuccess();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearch={handleSearch}
        onCartClick={() => setIsCartOpen(true)}
        onProfileClick={onProfileClick}
        onOrdersClick={onOrdersClick}
      />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Good Morning! 🌅</h2>
          <p className="text-gray-500">What would you like to buy today?</p>
        </div>

        <div className="mb-6">
          <CategoryFilter selected={selectedCategory} onSelect={handleCategorySelect} />
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}