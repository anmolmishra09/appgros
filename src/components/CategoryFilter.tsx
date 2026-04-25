import { CATEGORIES } from '../utils/constants';
import { CategoryType } from '../types';

interface CategoryFilterProps {
  selected: CategoryType | null;
  onSelect: (category: CategoryType | null) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onSelect(null)}
        className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
          selected === null
            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {CATEGORIES.map(category => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
            selected === category.id
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <span>{category.emoji}</span>
          {category.name}
        </button>
      ))}
    </div>
  );
}