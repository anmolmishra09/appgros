import { useOrder, useAuth, useCart } from '../utils/hooks';
import { formatCurrency, calculateSubtotal, calculateTax, calculateTotal, DELIVERY_FEE, generateOrderId } from '../utils/helpers';
import { Check, Package, Home, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Order, PaymentMethod } from '../types';

interface OrderSuccessScreenProps {
  onGoHome: () => void;
  onViewOrders: () => void;
}

export function OrderSuccessScreen({ onGoHome, onViewOrders }: OrderSuccessScreenProps) {
  const { user } = useAuth();
  const { items, clearCart } = useCart();
  const { addOrder } = useOrder();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (items.length > 0 && user && !order) {
      const subtotal = calculateSubtotal(items);
      const tax = calculateTax(subtotal);
      const total = calculateTotal(subtotal, DELIVERY_FEE, tax);

      const newOrder: Order = {
        id: generateOrderId(),
        userId: user.id,
        items: [...items],
        subtotal,
        deliveryFee: DELIVERY_FEE,
        tax,
        total,
        status: 'confirmed',
        paymentMethod: 'upi' as PaymentMethod,
        createdAt: new Date(),
        deliveryAddress: {
          street: '123 Main Street',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400001',
        },
      };

      addOrder(newOrder);
      setOrder(newOrder);
      clearCart();
    }
  }, [items, user, order, addOrder, clearCart]);

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full overflow-hidden">
        <div className="bg-emerald-500 p-8 text-center">
          <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center shadow-lg">
            <Check className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-white text-2xl font-bold mt-4">Order Confirmed!</h1>
          <p className="text-emerald-100 mt-1">Thank you for shopping with us</p>
        </div>

        <div className="p-6 space-y-4">
          {order && (
            <>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-mono font-bold text-lg text-gray-900">{order.id}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Items ({order.items.length})</span>
                  <span className="font-medium">{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery</span>
                  <span className="font-medium">{formatCurrency(order.deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">GST</span>
                  <span className="font-medium">{formatCurrency(order.tax)}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-emerald-600">{formatCurrency(order.total)}</span>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-4 flex items-center gap-3">
                <Package className="w-6 h-6 text-emerald-500" />
                <div>
                  <p className="font-medium text-gray-900">Estimated Delivery</p>
                  <p className="text-sm text-gray-500">Tomorrow, 10 AM - 2 PM</p>
                </div>
              </div>
            </>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={onGoHome}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Continue Shopping
            </button>
            <button
              onClick={onViewOrders}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}