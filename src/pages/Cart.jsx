// Import các hook và context cần thiết
import { useEffect, useState } from "react";

import { useAppContext } from '../context/AppContext';


import toast from "react-hot-toast";

// Component Cart - trang giỏ hàng
const Cart = () => {
    // Lấy dữ liệu từ context toàn cục
    const {
        products, 
        currency, 
        cartItems, 
        removeFromCart, 
        getCartCount,
        updateCartItem, 
        navigate, 
        getCartAmount,
        axios,
        user,
        setCartItems
    } = useAppContext();

    // State để lưu danh sách sản phẩm trong giỏ
    const [cartArray, setcartArray ] = useState([]);

    // Danh sách địa chỉ giao hàng
    const [addresses, setAddresses] = useState([]);

    // Hiển thị danh sách địa chỉ hay không
    const [showAddress, setShowAddress] = useState(false);

    // Địa chỉ đang được chọn
    const [selectedAddress, setSelectedAddress] = useState(null);

    // Lựa chọn phương thức thanh toán
    const [paymentOption, setPaymentOption] = useState("COD");

    // Hàm lấy thông tin sản phẩm từ giỏ hàng
    const getCart = () => {
        let temArray = [];
        for (const key in cartItems) {
            const product = products.find((item) => item._id === key);
            product.quantity = cartItems[key]; // Gán số lượng
            temArray.push(product);
        }
        setcartArray(temArray); // Cập nhật mảng sản phẩm trong giỏ
    }

    const getUserAddress = async () => {
        try{
            const {data} = await axios.get('/api/address/get');
             setAddresses(data.addresses); // Cập nhật danh sách địa chỉ
             if (data.addresses.length > 0) {
                setSelectedAddress(data.addresses[0]); // Chọn địa chỉ đầu tiên nếu có
        }else{
            toast.error(data.message);
        }
    }catch (error) {
        toast.error(error.message); // Hiển thị thông báo lỗi
    }
}

    // Hàm xử lý đặt hàng
    const placeOrder = async () => {
        try{
            if (!selectedAddress){
                return toast.error("Please select an address"); // Kiểm tra địa chỉ đã chọn
            }
            // Fix: Change "COC" to "COD" to match the payment option value
            if(paymentOption ==="COD"){
                const {data} = await axios.post('/api/order/cod',{
                    userId: user._id,
                    items: cartArray.map(item=> ({product:item._id, quantity:item.quantity})),
                    address: selectedAddress._id

                })
                if(data.success){
                    toast.success(data.message); // Hiển thị thông báo thành công
                    setCartItems({}); // Xóa giỏ hàng sau khi đặt hàng thành công
                    navigate('/my-orders'); // Chuyển hướng đến trang đơn hàng
            }else{
                toast.error(data.message); // Hiển thị thông báo lỗi
            }
        }
        // Add logic for other payment methods if needed, e.g., "Online"
        // else if (paymentOption === "Online") {
        //     // Handle online payment logic
        // }
    }catch (error) {
        toast.error(error.message); // Hiển thị thông báo lỗi
    }
     }

    // useEffect sẽ chạy khi danh sách sản phẩm hoặc giỏ hàng thay đổi
    useEffect(() => {
        if (products.length > 0 && cartItems) {
            getCart(); // Cập nhật giỏ hàng khi dữ liệu thay đổi
        }
    }, [products, cartItems]);

    useEffect(() => {
        if(user){
            getUserAddress(); // Lấy địa chỉ người dùng từ backend
        }
    },[user])

    // Trả về giao diện của component nếu có dữ liệu
    return products.length > 0 && cartItems ? (
        <div className="flex flex-col md:flex-row mt-16">

            {/* Vùng trái: danh sách sản phẩm trong giỏ */}
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
                </h1>

                {/* Tiêu đề bảng */}
                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {/* Hiển thị từng sản phẩm trong giỏ */}
                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            {/* Hình ảnh sản phẩm */}
                            <div onClick={() => {
                                navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                                scrollTo(0, 0);
                            }} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
                                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                            </div>
                            {/* Thông tin sản phẩm */}
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        <p>Qty:</p>
                                        {/* Dropdown chọn số lượng */}
                                        <select onChange={e => updateCartItem(product._id, Number(e.target.value))}
                                            value={cartItems[product._id]}
                                            className='outline-none'>
                                            {Array(cartItems[product._id] > 9 ? cartItems[product._id] : 9).fill('').map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Thành tiền của sản phẩm */}
                        <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>

                        {/* Nút xóa sản phẩm */}
                        <button onClick={() => removeFromCart(product._id)} className="cursor-pointer mx-auto">
                            <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                                    stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                ))}

                {/* Nút quay lại trang sản phẩm */}
                <button onClick={() => { navigate("/products"); scrollTo(0, 0) }}
                    className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
                    <svg width="15" height="11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
                            stroke="#615fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Continue Shopping
                </button>
            </div>

            {/* Vùng phải: thông tin đặt hàng */}
            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                {/* Địa chỉ giao hàng */}
                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">
                            {selectedAddress ? `${selectedAddress.street},${selectedAddress.city},${selectedAddress.state},${selectedAddress.country}` : "No address found"}
                        </p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:underline cursor-pointer">
                            Change
                        </button>

                        {/* Danh sách chọn địa chỉ */}
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                {
                                    addresses.map((address, index) => (
                                        <p key={index} onClick={() => { setSelectedAddress(address); setShowAddress(false) }}
                                            className="text-gray-500 p-2 hover:bg-gray-100">
                                            {address.street},{address.city},{address.state},{address.country}
                                        </p>
                                    ))
                                }
                                {/* Nút thêm địa chỉ mới */}
                                <p onClick={() => navigate("/add-address")} className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10">
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Phương thức thanh toán */}
                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
                    <select onChange={e => setPaymentOption(e.target.value)}
                        className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                {/* Tóm tắt chi phí */}
                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{currency}{getCartAmount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>{currency}{getCartAmount() * 2 / 100}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{currency}{getCartAmount() + getCartAmount() * 2 / 100}</span>
                    </p>
                </div>

                {/* Nút đặt hàng */}
                <button onClick={placeOrder}
                    className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition">
                    {paymentOption === "COD" ? "Place Order" : "Proceed to Payment"}
                </button>
            </div>
        </div>
    ) : null;
};

export default Cart;
