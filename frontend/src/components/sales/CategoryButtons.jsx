import React from 'react';

function CategoryButtons({ categories, currentCategory, onCategorySelect }) {
  return (
    <div className="mb-5 flex space-x-2 overflow-x-auto pb-2 print:hidden">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onCategorySelect(category)}
          className={`category-btn px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors
            ${currentCategory === category
              ? 'bg-indigo-500 text-white hover:bg-indigo-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`
          }
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryButtons;
