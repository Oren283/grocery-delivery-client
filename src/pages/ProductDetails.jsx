import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
    const {products, navigate, currency, addToCart} = useAppContext();
    const {id} = useParams();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Kiểm tra products có tồn tại và có dữ liệu
    const product = products && products.length > 0 ? products.find((item) => item._id === id) : null;

    useEffect(() => {
        if (products && products.length > 0 && product) {
            const related = products.filter(
                (item) => item.category === product.category && item._id !== product._id
            ).slice(0, 5);
            setRelatedProducts(related);
            setIsLoading(false);
        }
    }, [products, product]);

    useEffect(() => {
        setThumbnail(product?.image[0] ? product.image[0] : null);
    }, [product]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl">Đang tải...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl">Không tìm thấy sản phẩm</p>
            </div>
        );
    }

    return (
        <div className="mt-12">
            <p>
                <Link to={"/"}>Home</Link> /
                <Link to={"/products"}> Products</Link> /
                <Link to={`/products/${product.category.toLowerCase()}`}> {product.category}</Link> /
                <span className="text-primary"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer h-24" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 rounded overflow-hidden w-[400px] h-[400px]">
                        <img src={thumbnail} alt="Selected product" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                           <img key={i} className="md:w-4 w-3.5" src={i <4 ?assets.star : assets.star_dull}/>
                        ))}
                        <p className="text-base ml-2">(4)</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: {currency}{product.price}</p>
                        <p className="text-2xl font-medium">MRP: {currency}{product.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={() => addToCart(product._id)} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                            Add to Cart
                        </button>
                        <button onClick={() => {addToCart(product._id); navigate("/cart")}}  className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary_dull transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center mt-20">
                <div className="flex flex-col items-center w-max">
                    <p className="text-3xl font-medium">Related Products</p>
                    <div className="w-32 h-1 bg-primary rounded-full mt-2"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8 w-full">
                    {relatedProducts && relatedProducts.length > 0 ? (
                        relatedProducts.map((item) => (
                            <ProductCard 
                                key={item._id} 
                                product={item} 
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8">
                            <p className="text-gray-500">Không có sản phẩm liên quan</p>
                        </div>
                    )}
                </div>
                <button onClick={()=> {navigate('/products'); scrollTo(0,0)}} className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition">  Xem thêm </button>
            </div>
        </div>
    );
};

export default ProductDetails;