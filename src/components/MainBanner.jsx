import React from 'react'
// Nhập hình ảnh banner chính (kích thước lớn cho desktop)
import main_banner from '../assets/main_banner_bg.png'
// Nhập hình ảnh banner nhỏ (dành cho thiết bị di động)
import main_banner_sm from '../assets/main_banner_bg_sm.png'
// Dùng để điều hướng giữa các trang mà không cần tải lại trang
import { Link } from 'react-router-dom'
// Nhập icon mũi tên bên phải (dùng trong nút “Shop now”)
import arrow_icon from '../assets/arrow_icon.svg'
// Nhập icon mũi tên bên trái (dùng trong nút “Explore deals”)
import left_icon from '../assets/left_icon.svg'

// Component hiển thị banner chính trên trang chủ
const MainBanner = () => {
  return (
    // Thẻ chứa toàn bộ banner, dùng `relative` để các thành phần bên trong có thể dùng `absolute`
    <div className='relative'>
        {/* Hiển thị ảnh banner lớn cho màn hình từ md (768px) trở lên */}
        <img src={main_banner} alt="main_banner" className='w-full hidden md:block'/>

        {/* Hiển thị ảnh banner nhỏ cho thiết bị di động (ẩn khi md trở lên) */}
        <img src={main_banner_sm} alt="main_banner_sm" className='w-full md:hidden'/>

        {/* Phần nội dung nằm đè lên ảnh banner */}
        <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>
            
            {/* Tiêu đề chính, căn giữa trên mobile và căn trái trên desktop */}
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'>
              Tươi ngon đáng tin cậy, tiết kiệm khiến bạn yêu thích!
            </h1>
            
            {/* Nhóm các nút điều hướng bên dưới tiêu đề */}
            <div className="flex items-center mt-6 font-medium">

              {/* Nút “Shop now” hiển thị cả trên mobile và desktop */}
              <Link 
                to={"/products"} 
                className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer"
              >
                Mua ngay
                {/* Icon mũi tên chỉ hiển thị trên mobile */}
                <img className="md:hidden transition group-focus:translate-x-1" src={arrow_icon} alt="arrow" />
              </Link>

              {/* Nút “Explore deals” chỉ hiển thị trên màn hình md trở lên */}
              <Link 
                to={"/products"} 
                className="group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer"
              >
                Khám phá ưu đãi
                <img className="transition group-hover:translate-x-1" src={left_icon} alt="left" />
              </Link>
            </div>
        </div>
    </div>
  )
}

// Xuất component để có thể sử dụng ở nơi khác
export default MainBanner
