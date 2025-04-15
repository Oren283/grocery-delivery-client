import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const AllProducts = () => {
  // Lấy danh sách sản phẩm và từ khóa tìm kiếm từ context
  const { products, searchQuery = '' } = useAppContext();
  
  // State để lưu danh sách sản phẩm đã lọc
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Hiệu ứng để lọc sản phẩm khi danh sách sản phẩm hoặc từ khóa thay đổi
  useEffect(() => {
    // Đảm bảo searchQuery là chuỗi (mặc định là chuỗi rỗng nếu không phải)
    const query = typeof searchQuery === 'string' ? searchQuery : '';
    
    // Lọc sản phẩm dựa trên từ khóa tìm kiếm
    const filtered = products.filter(product => 
      query
        ? product.name.toLowerCase().includes(query.toLowerCase()) // Tìm kiếm không phân biệt hoa thường
        : true // Trả về tất cả sản phẩm nếu không có từ khóa tìm kiếm
    );
    
    // Cập nhật state sản phẩm đã lọc
    setFilteredProducts(filtered);
  }, [products, searchQuery]);

  // Hiển thị thông báo nếu không có sản phẩm nào
  if (!products || products.length === 0) {
    return (
      <div className="mt-16 flex justify-center items-center">
        <p className="text-xl text-gray-600">Không có sản phẩm nào</p>
      </div>
    );
  }

  return (
    <div className='mt-16 flex flex-col'>
      {/* Tiêu đề section với hiệu ứng gạch chân */}
      <div className='flex flex-col items-end w-max mb-6'> 
        <p className='text-2xl font-medium uppercase'>Tất cả sản phẩm</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>

      {/* Hiển thị theo điều kiện dựa trên kết quả lọc */}
      {filteredProducts.length === 0 ? (
        // Hiển thị thông báo nếu không có sản phẩm nào khớp với tìm kiếm
        <div className="flex justify-center items-center mt-8">
          <p className="text-lg text-gray-600">Không tìm thấy sản phẩm phù hợp</p>
        </div>
      ) : (
        // Hiển thị lưới sản phẩm nếu có kết quả phù hợp
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product._id}  // Key duy nhất cho mỗi sản phẩm
              product={product}  // Truyền dữ liệu sản phẩm vào component card
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default AllProducts