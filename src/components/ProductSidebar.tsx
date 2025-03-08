import React, { useState } from 'react';
import { Slider } from '@heroui/react';
import { FaStar } from 'react-icons/fa'; 

interface SidebarProps {
  onApplyFilters: (query : string) => void;
}

const ProductSidebar: React.FC<SidebarProps> = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000,
    selectedColor: '',
    selectedSize: '',
    minRating: null as number | null,
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters((filters) => ({ ...filters, [key]: value }));
  };

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      handleFilterChange('minPrice', value[0]);
      handleFilterChange('maxPrice', value[1]);
    }
  }
 
  const handleApplyFilters = () => {
    const query = new URLSearchParams();
    
    query.append('min_price', filters.minPrice.toString());
    query.append('max_price', filters.maxPrice.toString());

    if (filters.selectedColor){
      query.append('color', filters.selectedColor);
    }

    if (filters.selectedSize){
      query.append('size', filters.selectedSize);
    }

    if (filters.minRating !== null){
      query.append('min_rating', filters.minRating.toString());
    }

    onApplyFilters(query.toString()); 
  };

  return (
    <div className='flex h-auto'>
      <div className='w-64 flex flex-col bg-gray-800 text-white p-4'>
        <h1 className='text-3xl text-center font-bold mb-4'>Filters</h1>

        <label className='text-xl mb-2'>Price</label>
        <Slider
          className="max-w-md"
          defaultValue={[filters.minPrice, filters.maxPrice]}
          formatOptions={{ style: 'currency', currency: 'INR' }}
          label="Range"
          minValue={0}
          maxValue={1000}
          step={50}
          onChange={handleSliderChange}
        />

        <div className='my-4'>
          <label className='text-xl'>Color</label>
          <select
            className='w-full rounded p-2 mt-2 text-black'
            value={filters.selectedColor}
            onChange={(e) => handleFilterChange('selectedColor', e.target.value)}
          >
            <option value="">All Colors</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
          </select>
        </div>

        <div className='mb-4'>
          <label className='block text-xl mb-2'>Size</label>
          <div className="flex gap-2">  
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                onClick={() => handleFilterChange('selectedSize', filters.selectedSize === size ? '' : size)}
                className={`w-10 p-1 rounded-full  ${filters.selectedSize === size ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

      
        <div className='mb-4'>
          <label className='block text-xl mb-2'>Ratings</label>
          <div className="flex gap-2 ms-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-2xl 
                ${filters.minRating !== null && star <= filters.minRating ? 'text-yellow-400' : 'text-gray-500'}`}
                onClick={() => handleFilterChange('minRating', filters.minRating === star ? null : star)}
              />
            ))}
          </div>
        </div>

        <button
          className='bg-blue-500 p-2 rounded w-full mt-4'
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default ProductSidebar;
