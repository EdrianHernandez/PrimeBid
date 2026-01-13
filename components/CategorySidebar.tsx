import React from 'react';
import { Category } from '../types';
import { CATEGORIES } from '../constants';
import { LayoutGrid, Palette, Smartphone, Watch, Armchair, Trophy, Car } from 'lucide-react';

interface CategorySidebarProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ selectedCategory, onSelectCategory }) => {
  const getIcon = (cat: Category) => {
    switch (cat) {
      case 'All': return <LayoutGrid className="w-4 h-4" />;
      case 'Art': return <Palette className="w-4 h-4" />;
      case 'Electronics': return <Smartphone className="w-4 h-4" />;
      case 'Jewelry': return <Watch className="w-4 h-4" />;
      case 'Antiques': return <Armchair className="w-4 h-4" />;
      case 'Collectibles': return <Trophy className="w-4 h-4" />;
      case 'Vehicles': return <Car className="w-4 h-4" />;
      default: return <LayoutGrid className="w-4 h-4" />;
    }
  };

  return (
    <div className="auction-filter w-full md:w-64 flex-shrink-0 mb-6 md:mb-0">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sticky top-20">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
          Categories
        </h3>
        <nav className="space-y-1">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className={`${selectedCategory === category ? 'text-indigo-500' : 'text-slate-400'}`}>
                {getIcon(category)}
              </span>
              {category}
            </button>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
            Filters
          </h3>
          <div className="space-y-3 px-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 transition-colors" />
              <span className="text-sm text-slate-600 group-hover:text-slate-900">Ending Soon</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 transition-colors" />
              <span className="text-sm text-slate-600 group-hover:text-slate-900">No Reserve</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 transition-colors" />
              <span className="text-sm text-slate-600 group-hover:text-slate-900">Buy Now Available</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;