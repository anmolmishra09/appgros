import { useState } from 'react';
import { useAuth, useCart } from '../utils/hooks';
import { Search, ShoppingCart, User, LogOut, Package } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onCartClick: () => void;
  onProfileClick: () => void;
  onOrdersClick: () => void;
}

export function Header({ onSearch, onCartClick, onProfileClick, onOrdersClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const { getItemCount } = useCart();
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 text-white p-2 rounded-xl">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">FreshMart</h1>
              <p className="text-xs text-gray-500">Grocery Delivery</p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
            </div>
          </form>

          <div className="flex items-center gap-2">
            <button
              onClick={onCartClick}
              className="relative bg-emerald-50 hover:bg-emerald-100 text-emerald-600 p-2 rounded-xl transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                  {getItemCount()}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl transition-colors"
              >
                <User className="w-5 h-5 text-gray-600" />
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {user?.name?.split(' ')[0]}
                </span>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  <button
                    onClick={() => { onProfileClick(); setShowMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button
                    onClick={() => { onOrdersClick(); setShowMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Package className="w-4 h-4" />
                    Orders
                  </button>
                  <hr className="my-2 border-gray-100" />
                  <button
                    onClick={() => { logout(); setShowMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleSearch} className="mt-3 sm:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </form>
      </div>
    </header>
  );
}