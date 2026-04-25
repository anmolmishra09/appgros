import { useAuth, useOrder, useCart } from '../utils/hooks';
import { formatCurrency } from '../utils/helpers';
import { ArrowLeft, Package, Clock, Check } from 'lucide-react';

interface OrdersScreenProps {
  onBack: () => void;
}

export function OrdersScreen({ onBack }: OrdersScreenProps) {
  const { user } = useAuth();
  const { orders } = useOrder();

  const userOrders = orders.filter(order => order.userId === user?.id);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Check className="w-5 h-5 text-emerald-500" />;
      default:
        return <Clock className="w-5 h-5 text-amber-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-100 text-emerald-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-amber-100 text-amber-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">My Orders</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {userOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500">Your order history will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {userOrders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {order.items.slice(0, 4).map(item => (
                      <span key={item.product.id} className="text-2xl">{item.product.image}</span>
                    ))}
                    {order.items.length > 4 && (
                      <span className="text-sm text-gray-500 flex items-center">+{order.items.length - 4} more</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">{order.items.length} items</span>
                    <span className="font-bold text-emerald-600">{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}