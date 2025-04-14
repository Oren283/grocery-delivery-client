import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const ProductCategory = () => {

    const {products} = useAppContext();
    const {category} = useParams();
    const categoryMapping = {
        'vegetable': 'vegetables',
        'fruits': 'fruits',
        'cold': 'cold drinks',
        'bakery': 'bakery',
        'dairy': 'dairy products',
        'grains': 'grains'
    };
    const normalizedCategory = categoryMapping[category.toLowerCase()];
    const filteredProducts = products.filter((product) => 
        product.category && product.category.toLowerCase() === normalizedCategory
    );

  return (
    <div className='mt-16 '>
        <div className='flex flex-col items-end w-max mt-16'>
            <p className='text-2xl font-medium'>{category.toUpperCase()}</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
        {filteredProducts.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
                {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} /> // Assuming ProductCard is a component that takes a product prop
                ))}
            </div>
        ): (
            <div className='flex items-center justify-center h-[60vh]'>
                <p className='text-2xl font-medium text-primary'>No products found in this category.</p>
            </div>
        )}
    </div>
  )
}

export default ProductCategory