import React, { useState,useEffect } from 'react';
import { Spinner, Pagination } from '@heroui/react';
import image from "../assets/product.jpg";
import { useQuery } from '@tanstack/react-query';

interface AllProps {
    id: string;
    name: string;
    category: string;
    price: number;
    brand: string;
    rating: number;
    stock: number;
    color: string;
    size: string;
    discount: number;
}

interface ProductListProps {
    filterQuery: string;
    category: string;
}


const fetchProduct = async (filterQuery:string, category:string, sortBy:string, sortOrder:string) =>{
    const query = new URLSearchParams(filterQuery);
    query.append('sort_by', sortBy);
    query.append('sort_order', sortOrder);

    const encodedCategory = encodeURIComponent(category || '');
    const response = await fetch(
        `https://0261cadc-a144-4755-8dda-dc4b44fcef31.eu-west-1.cloud.genez.io/api/products?category=${encodedCategory}&${query.toString()}`
    );

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }    
    return response.json();
}   

const ProductList: React.FC<ProductListProps> = ({ filterQuery, category }) => {
    //scrolling to top
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const [sortBy, setSortBy] = useState<'price' | 'rating' | 'stock'>('price');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState<number>(1);

    const { data, isLoading, isError, error } = useQuery({queryKey: ['products', filterQuery, category, sortBy, sortOrder], queryFn: () => fetchProduct(filterQuery,category,sortBy,sortOrder) });


    if (isLoading) {
        return (
            <div className="mx-24 my-10">
                <Spinner label="Loading..." />
            </div>
        );
    }

    if (isError) {
        return <div className="text-xl text-center text-red-500 p-4">Error fetching products: {error.message}</div>;
    }

    if (!data || data.data.length === 0) {
        return <div className='text-xl m-10'>No products available</div>;
    }

    return (
        <div className="w-[1250px]">

            <div className="flex justify-between p-8">
                <h1 className=' text-5xl font-bold'>{category} </h1>

                <div>
                    <select
                        className="border border-gray-500 p-2 rounded shadow-lg"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'price' | 'rating' | 'stock')}
                    >
                        <option value="price">Price</option>
                        <option value="rating">Rating</option>
                        <option value="stock">Stock</option>
                    </select>

                    <select
                        className="border border-gray-500 p-2 ms-4 rounded shadow-sm"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    >
                        <option value="asc">Low to High</option>
                        <option value="desc">High to Low</option>
                    </select>
                </div>
                
            </div>


            <div className="flex flex-wrap justify-evenly">
                {data.data.map((item:AllProps) => (
                    <div key={item.id} className="w-[260px] p-4 m-2 bg-gray-100 rounded-lg border border-gray-400 shadow-lg">

                        <img src={image} alt={item.name} className="w-full h-40 object-cover rounded-lg" />

                        <p>Brand: {item.brand}</p>
                        <p>Stock Available: {item.stock}</p>
                        <p>Color: {item.color}</p>
                        <p>Size: {item.size}</p>
                        <p>Rating: {item.rating} Out of 5</p>
                        <p className="text-lg font-bold text-green-500">Price: ₹ {item.price}</p>
                        <p className="text-lg font-bold text-red-500">Discount: {item.discount}% off</p>
                    </div>
                ))}
            </div>

            {data.metadata && (
                <div className="flex block justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        total={data.metadata.total_pages}
                        page={page}
                        onChange={(n) => setPage(n)}
                    />
                </div>
            )}

        </div>
    );
};

export default ProductList;
