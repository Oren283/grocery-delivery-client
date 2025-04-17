import { createContext, useContext, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import  toast  from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin,setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);

    const [cartItems, setCartItems] = useState({});

    const [searchQuery, setSearchQuery] = useState({});

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/product/list',);
            if(data.success){
               setProducts(data.products); 
            }else{
                toast.error(data.message);
            }
        } catch (error) {
           toast.error(error.response?.data?.message || error.message);
        }
    };

    //Fetch User Auth Status,User Data and Cart Items

        const fetchUser = async () => {
           try {
            const { data } = await axios.get('/api/user/is-auth');
            if (data.success) {
               setUser(data.user);
               setCartItems(data.user.cartItems || {});
            } else {
               setUser(null);
               setCartItems({});
               toast.error(data.message);
            }
           } catch (error) {
            setUser(null);
            setCartItems({});
            console.error('Authentication error:', error);
           }
        }



    //Fetch Seller Status
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('/api/seller/is-auth');
            if (data.success) {
                setIsSeller(true);
            } else {
                setIsSeller(false);
            }
        } catch (error) {
            console.error('Error fetching seller status:', error);
            setIsSeller(false);
        }
    };

    const addToCart = (itemId) => {
       let cartData = structuredClone(cartItems);
       if (cartData[itemId]){
            cartData[itemId] += 1;
       }else{
        cartData[itemId]= 1;
       }
         setCartItems(cartData);
         toast.success("Added to Cart")
    };

    const updateCartItem = (itemId, quantity) =>{
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart Updated")
    };

    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]){
             cartData[itemId] -= 1;
             if (cartData[itemId] === 0){
                delete cartData[itemId]
             }
        }
        toast.success("Removed from Cart")
        setCartItems(cartData);
        
    };

    const getCartCount = () =>{
        let totalCount = 0;
        for(const item in cartItems){
            totalCount += cartItems[item];
        }
        return totalCount;
    };

    const getCartAmount =() =>{
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0){
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    };


    useEffect(() => {
        fetchUser();
        fetchSeller();
        fetchProducts();
    }, []);

    //Update Cart Items in DB
    useEffect(() => {
        const updateCart = async () => {
            if (!user || Object.keys(cartItems).length === 0) return;
            
            try {
                const {data} = await axios.post('/api/cart/update', {cartItems})
                if (!data.success) {
                    toast.error(data.message)
                    // Nếu cập nhật thất bại, đồng bộ lại cartItems từ server
                    await fetchUser();
                }
            } catch (error) {
                console.error('Lỗi cập nhật giỏ hàng:', error);
                toast.error('Không thể cập nhật giỏ hàng. Vui lòng thử lại.');
                // Đồng bộ lại cartItems từ server khi có lỗi
                await fetchUser();
            }
        }
        updateCart();
    }, [cartItems])


    const value = {navigate, user, setUser, isSeller, setIsSeller,
        showUserLogin, setShowUserLogin, products, currency, addToCart,updateCartItem,removeFromCart,cartItems,searchQuery, setSearchQuery
        , getCartCount,getCartAmount,axios, fetchProducts,
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext =() =>{
    return useContext(AppContext)
}