import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const AllProducts = () => {
  const { products, searchQuery = '' } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const query = typeof searchQuery === 'string' ? searchQuery : '';
    const filtered = products.filter(product => 
      query
        ? product.name.toLowerCase().includes(query.toLowerCase())
        : true
    );
    setFilteredProducts(filtered);
  }, [products, searchQuery]);

  if (!products || products.length === 0) {
    return (
      <div className="mt-16 flex justify-center items-center">
        <p className="text-xl text-gray-600">No products available</p>
      </div>
    );
  }

  return (
    <div className='mt-16 flex flex-col'>
      <div className='flex flex-col items-end w-max mb-6'> 
        <p className='text-2xl font-medium uppercase'>All products</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex justify-center items-center mt-8">
          <p className="text-lg text-gray-600">No products match your search</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product._id} 
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default AllProducts