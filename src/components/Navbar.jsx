// Import React và các thành phần cần thiết
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom' // NavLink để điều hướng giữa các trang
import { useAppContext } from "../context/AppContext"; // Import context của ứng dụng
import logo from '../assets/logo.svg' // Logo của website
import profile from '../assets/profile_icon.png' // Icon avatar người dùng
import { assets } from '../assets/assets';

// Khai báo component Navbar
const Navbar = () => {
    // Khai báo biến trạng thái "open" để điều khiển menu mobile (true: mở, false: đóng)
    const [open, setOpen] = React.useState(false)
    
    // Lấy các biến và hàm từ context: thông tin user, hàm setUser, setShowUserLogin, và điều hướng navigate
    const { user, setUser, setShowUserLogin, navigate , setSearchQuery, searchQuery,getCartCount} = useAppContext();

    // Hàm xử lý khi người dùng đăng xuất
    const logout = async ()=> {
        setUser(null);     // Xóa thông tin user
        navigate('/');     // Quay về trang chủ
    }

    useEffect(() => {
        if(searchQuery.length >0){
            navigate("/products"); // Điều hướng đến trang sản phẩm khi có truy vấn tìm kiếm
        }
    },[searchQuery]);

    return (
        // Thanh điều hướng chính, thiết kế theo kiểu Flexbox
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            {/* Logo dẫn về trang chủ khi bấm vào */}
            <NavLink to='/' onClick={()=>setOpen(false)}>
                <img className="h-9" src={logo} alt="logo" />
            </NavLink>

            {/* Menu desktop - hiển thị từ kích thước sm trở lên */}
            <div className="hidden sm:flex items-center gap-8">
                
                {/* Các liên kết điều hướng */}
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>All Product</NavLink>
                <NavLink to='/'>Contact</NavLink>

                {/* Thanh tìm kiếm - chỉ hiển thị trên màn hình lớn (lg trở lên) */}
                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input
                        onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật truy vấn tìm kiếm khi người dùng nhập
                        className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                        type="text"
                        placeholder="Search products" // Gợi ý tìm kiếm
                    />
                    {/* Icon tìm kiếm */}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path clipRule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {/* Icon giỏ hàng + hiển thị số lượng sản phẩm */}
                <div onClick={()=> navigate("/cart")} className="relative cursor-pointer">
                   <img className="w-6 opacity-80" src={assets.cart_icon} alt="" />
                    {/* Số lượng sản phẩm trong giỏ hàng */}
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
                        {getCartCount()}
                    </button>
                </div>

                {/* Hiển thị nút Login nếu chưa đăng nhập, hoặc Avatar và menu nếu đã đăng nhập */}
                {!user ? (
                    <button 
                        onClick={() => setShowUserLogin(true)} 
                        className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
                    >
                        Login
                    </button>
                ) : (
                    <div className='relative group'>
                        {/* Avatar user */}
                        <img className="w-10 rounded-full" src={profile} alt=""/>
                        {/* Menu hiện ra khi hover vào avatar */}
                        <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-40 rounded-md text-sm z-40'>
                            <li onClick={()=> navigate("my-orders")} className="pl-3 p-1.5 hover:bg-primary/10 cursor-pointer">My Orders</li>
                            <li onClick={logout} className="pl-3 p-1.5 hover:bg-primary/10 cursor-pointer">Logout</li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Nút menu cho thiết bị di động (hiển thị khi sm:hidden) */}
            <div className="flex items-center gap-6 sm:hidden">
                 <div onClick={()=> navigate("/cart")} className="relative cursor-pointer">
                   <img className="w-6 opacity-80" src={assets.cart_icon} alt="" />
                    {/* Số lượng sản phẩm trong giỏ hàng */}
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
                        {getCartCount()}
                    </button>
                </div>

            <button onClick={() => setOpen(!open)} aria-label="Menu" className="sm:hidden">
                {/* Biểu tượng menu (3 gạch ngang) */}
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>
            </div>
         

            {/* Menu hiển thị trên thiết bị di động khi open = true */}
            { open && (
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                {/* Các liên kết menu */}
                <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                <NavLink to="/products" onClick={() => setOpen(false)}>All Product</NavLink>
                { user && <NavLink to="/products" onClick={() => setOpen(false)}>My Orders</NavLink> }
                <NavLink to="/" onClick={() => setOpen(false)}>Contact</NavLink>

                {/* Nút đăng nhập hoặc đăng xuất trên mobile */}
                {!user ? (
                    <button onClick={() =>{
                        setOpen(false); // Đóng menu
                        setShowUserLogin(true); // Mở form đăng nhập
                    }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                        Login
                    </button>
                ) :(
                    <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                        Logout
                    </button>
                )}
            </div>
            )}
        </nav>
    )
}

// Xuất component Navbar để sử dụng ở nơi khác
export default Navbar
