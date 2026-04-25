import { useState } from 'react';
import { useCart, useAuth, useOrder } from '../utils/hooks';
import { formatCurrency, calculateSubtotal, calculateTax, calculateTotal, DELIVERY_FEE, generateOrderId } from '../utils/helpers';
import { X, CreditCard, Smartphone, Banknote, Check, Loader } from 'lucide-react';
import { PaymentMethod, Order } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function PaymentModal({ isOpen, onClose, onSuccess }: PaymentModalProps) {
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrder();
  
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  if (!isOpen) return null;

  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, DELIVERY_FEE, tax);

  const paymentMethods = [
    { id: 'upi' as PaymentMethod, label: 'UPI Payment', icon: Smartphone, description: 'Pay using UPI apps' },
    { id: 'card' as PaymentMethod, label: 'Card Payment', icon: CreditCard, description: 'Credit/Debit card' },
    { id: 'cod' as PaymentMethod, label: 'Cash on Delivery', icon: Banknote, description: 'Pay when delivered' },
  ];

  const handlePayment = async () => {
    if (selectedMethod === 'upi' && !upiId.includes('@')) {
      alert('Please enter a valid UPI ID');
      return;
    }

    if (selectedMethod === 'card') {
      if (cardNumber.length < 16) {
        alert('Please enter a valid card number');
        return;
      }
      if (!cardExpiry || !cardCvv) {
        alert('Please enter card expiry and CVV');
        return;
      }
    }

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const order: Order = {
      id: generateOrderId(),
      userId: user?.id || '',
      items: [...items],
      subtotal,
      deliveryFee: DELIVERY_FEE,
      tax,
      total,
      status: selectedMethod === 'cod' ? 'confirmed' : 'paid',
      paymentMethod: selectedMethod,
      createdAt: new Date(),
      deliveryAddress: {
        street: '123 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400001',
      },
    };

    addOrder(order);
    clearCart();
    setIsProcessing(false);
    onSuccess();
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Payment</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Items ({items.length})</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery</span>
                <span className="font-medium">{formatCurrency(DELIVERY_FEE)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">GST (5%)</span>
                <span className="font-medium">{formatCurrency(tax)}</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between text-base">
                <span className="font-bold">Total</span>
                <span className="font-bold text-emerald-600">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Select Payment Method</h3>
            <div className="space-y-3">
              {paymentMethods.map(method => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                    selectedMethod === method.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    selectedMethod === method.id ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <method.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900">{method.label}</p>
                    <p className="text-sm text-gray-500">{method.description}</p>
                  </div>
                  {selectedMethod === method.id && (
                    <Check className="w-5 h-5 text-emerald-500" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Details */}
          {selectedMethod === 'upi' && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">UPI ID</label>
              <input
                type="text"
                value={upiId}
                onChange={e => setUpiId(e.target.value)}
                placeholder="yourname@upi"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          )}

          {selectedMethod === 'card' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Expiry</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={e => setCardExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">CVV</label>
                  <input
                    type="password"
                    value={cardCvv}
                    onChange={e => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    placeholder="***"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {selectedMethod === 'cod' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-amber-800 text-sm">
                Pay with cash when your order is delivered. Please keep exact change ready.
              </p>
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {selectedMethod === 'cod' ? 'Place Order' : `Pay ${formatCurrency(total)}`}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}