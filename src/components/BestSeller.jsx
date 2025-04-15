import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
  const { products } = useAppContext();
  
  // Kiểm tra và lọc sản phẩm
  const bestSellers = Array.isArray(products) && products.length > 0
    ? products
      .filter(product => product && typeof product.offerPrice === 'number')
      .sort((a, b) => b.offerPrice - a.offerPrice)
      .slice(0, 4)
    : [];

  return (
    <div className='mt-16'>
        <p className='text-2xl md:text-3xl font-medium'>BestSellers</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
          {bestSellers.map((product) => (
            <ProductCard key={product._id} product={product}/>
          ))}
        </div>
    </div>
  )
}

export default BestSeller