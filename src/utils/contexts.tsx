import { createContext, useState, useEffect, ReactNode } from 'react';
import { User, CartItem, Order, Product } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrdersByUser: (userId: string) => Order[];
}

export const AuthContext = createContext<AuthContextType | null>(null);
export const CartContext = createContext<CartContextType | null>(null);
export const OrderContext = createContext<OrderContextType | null>(null);

// Demo user for easy testing
const DEMO_USER: (User & { password: string }) = {
  id: 'demo-user-123',
  name: 'Demo User',
  email: 'demo@freshmart.com',
  phone: '9876543210',
  password: 'Demo@123',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('grocery_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check for demo user first
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      const { password: _, ...userWithoutPassword } = DEMO_USER;
      setUser(userWithoutPassword);
      localStorage.setItem('grocery_user', JSON.stringify(userWithoutPassword));
      return { success: true };
    }
    
    // Check registered users
    const savedUsers = JSON.parse(localStorage.getItem('grocery_users') || '[]');
    const foundUser = savedUsers.find((u: User & { password: string }) => 
      u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('grocery_user', JSON.stringify(userWithoutPassword));
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = async (name: string, email: string, phone: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if trying to register with demo email
    if (email === DEMO_USER.email) {
      return { success: false, error: 'This email is already registered' };
    }
    
    const savedUsers = JSON.parse(localStorage.getItem('grocery_users') || '[]');
    
    if (savedUsers.some((u: User) => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }

    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      password,
    };

    savedUsers.push(newUser);
    localStorage.setItem('grocery_users', JSON.stringify(savedUsers));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('grocery_user', JSON.stringify(userWithoutPassword));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('grocery_user');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('grocery_user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('grocery_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('grocery_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const getItemCount = () => items.reduce((sum, item) => sum + item.quantity, 0);

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('grocery_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('grocery_orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const getOrdersByUser = (userId: string) => {
    return orders.filter(order => order.userId === userId);
  };

  const value: OrderContextType = {
    orders,
    addOrder,
    getOrdersByUser,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}