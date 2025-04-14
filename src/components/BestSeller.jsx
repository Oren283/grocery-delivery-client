import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
  const {products} = useAppContext();
  return (
    <div className='mt-16'>
        <p className='text-2xl md:text-3xl font-medium'>BestSellers</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4'>
          {products
            .filter(product => product.inStock)
            .sort((a, b) => b.offerPrice - a.offerPrice)
            .slice(0, 4)
            .map((product) => (
              <ProductCard key={product._id} product={product}/>
          ))}
        </div>
    </div>
  )
}

export default BestSeller