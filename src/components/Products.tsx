import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import ProductSidebar from './ProductSidebar';
import ProductList from './ProductList';

const Products: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [filterQuery, setFilterQuery] = useState<string>('');

  const handleFilterChange = (query: string) => {
    setFilterQuery(query);
  };

  const categoryName = category ?? 'none';

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen">
        <ProductSidebar onApplyFilters={handleFilterChange} />
        
        <ProductList filterQuery={filterQuery} category={categoryName} />
      </div>
    </div>
  );
};

export default Products;
