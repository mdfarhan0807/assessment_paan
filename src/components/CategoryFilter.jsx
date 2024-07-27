import React, { useState } from 'react';

function CategoryFilter({ categories, selectedCategories, onCategoryChange }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleCheckboxChange = (categoryName) => {
    if (categoryName === 'All Categories') {
      onCategoryChange([]);
    } else {
      if (selectedCategories.includes(categoryName)) {
        onCategoryChange(selectedCategories.filter(category => category !== categoryName));
      } else {
        onCategoryChange([...selectedCategories, categoryName]);
      }
    }
  };

  return (
    <div className="category-filter">
      <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="filter-button">
        <span role="img" aria-label="filter">🔍 Filter</span>
      </button>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <div className="category-option">
            <input
              type="checkbox"
              id="all-categories"
              value="All Categories"
              checked={selectedCategories.length === 0}
              onChange={() => handleCheckboxChange('All Categories')}
            />
            <label htmlFor="all-categories">All Categories</label>
          </div>
          {categories.map((category) => (
            <div key={category.id} className="category-option">
              <input
                type="checkbox"
                id={category.name}
                value={category.name}
                checked={selectedCategories.includes(category.name)}
                onChange={() => handleCheckboxChange(category.name)}
              />
              <label htmlFor={category.name}>{category.name}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryFilter;
