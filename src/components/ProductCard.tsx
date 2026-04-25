import { Product } from '../types';
import { useCart } from '../utils/hooks';
import { formatCurrency } from '../utils/helpers';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { items, addItem, updateQuantity } = useCart();
  
  const cartItem = items.find(item => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="bg-emerald-50 p-6 flex items-center justify-center">
        <span className="text-6xl">{product.image}</span>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight">{product.name}</h3>
          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
            {product.unit}
          </span>
        </div>
        
        <p className="text-gray-500 text-sm mb-3 line-clamp-1">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-emerald-600">
            {formatCurrency(product.price)}
          </span>
          
          {quantity === 0 ? (
            <button
              onClick={() => addItem(product)}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-medium transition-colors active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              Add
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="w-8 text-center font-semibold text-gray-900">{quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="w-8 h-8 flex items-center justify-center bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}