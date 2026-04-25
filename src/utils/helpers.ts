import { CartItem } from '../types';

export const DELIVERY_FEE = 40;
export const TAX_RATE = 0.05; // 5% GST

export function formatCurrency(amount: number | undefined): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '₹0';
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
}

export function validatePassword(password: string): { valid: boolean; message: string } {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain an uppercase letter' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain a lowercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain a number' };
  }
  return { valid: true, message: '' };
}

export function calculateSubtotal(items: CartItem[]): number {
  if (!items || items.length === 0) return 0;
  return items.reduce((sum, item) => {
    const price = item.product?.price || 0;
    const quantity = item.quantity || 0;
    return sum + price * quantity;
  }, 0);
}

export function calculateTax(subtotal: number): number {
  if (!subtotal || subtotal <= 0) return 0;
  return Math.round(subtotal * TAX_RATE);
}

export function calculateTotal(subtotal: number, deliveryFee: number, tax: number): number {
  const safeSubtotal = subtotal || 0;
  const safeDeliveryFee = deliveryFee || 0;
  const safeTax = tax || 0;
  return safeSubtotal + safeDeliveryFee + safeTax;
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `FM-${timestamp}-${random}`;
}

export function formatDate(date: Date | string): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}