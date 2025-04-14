import organic_vegitable from './organic_vegitable.png';
import bakery from './bakery.png';
import dairy_product from './dairy_product.png';
import grain from './grain.png';
import bottles from './bottles.png';
import fruits from './fresh_fruits.png';
import potato from './Potato.png';
import potato_1 from './potato_1.png';
import potato_2 from './potato2.png'
import star from './start_icon.svg';
import star_dull from './star_icon.svg'
import cart_icon from './cart_icon.svg';
import truck_icon from './delivery_truck_icon.svg';
import leaf_icon from './leaf_icon.svg';
import coin_icon from './coin_icon.svg';
import trust_icon from './trust_icon.svg';
import appple from './Apple.png';
import add_address from './add_address.svg';
import add_icon from './add_icon.svg';
import productlist_icon from './productlist_icon.svg';
import order_icon from './order_icon.svg';
import logo from './logo.svg';
import upload from './upload.png';



export const assets ={
    star,
    star_dull,
    cart_icon,
    add_address,
    add_icon,
    productlist_icon,
    order_icon,
    logo,
    upload,

  
};

export const categories = [
    {
        text: "Organic Vegitable",
        image: organic_vegitable,
        path: "Vegetable",
        bgColor: "#FEF6DA",
    },
    {
        text:"Fresh Fruits",
        image: fruits,
        path: "Fruits",
        bgColor:"#FEE0E0",

    },
    {
        text:"Cold Drinks",
        image: bottles,
        path: "Cold",
        bgColor: "#D5F5E3",
    },
    {
        text: "Bakery & Breads",
        image: bakery,
        path: "Bakery",
        bgColor: "#E0F6FE",
    },
    {
        text:" Dairy Products",
        image: dairy_product,
        path: "Dairy",
        bgColor: "#FEE6CD",
    },
    {
        text: "Grains & Cereals",
        image: grain,
        path: "Grains",
        bgColor: "#F1E3F9",
    }
];

export const dummyProducts = [
   {
    _id:"gd46g23h",
    name:"Potato 500kg",
    category:"Vegetables",
    price:25,
    offerPrice:30,
    image:[potato, potato_1, potato_2],
    description:[
        "Fresh and organic",
        "Rich in carbohydrates",
        "Ideal for curries and fries",
    ],
    creatAt:"2025-03-25T07:17:46.018Z",
    updateAt:"2025-03-25T07:17:46.018Z",
    inStock:true,
   },
   {
    _id:"fjdkne32",
    name:"Carrot 500kg",
    category:"Vegetables",
    price:25,
    offerPrice:30,
    image:[potato, potato_1, potato_2],
    description:[
        "Fresh and organic",
        "Rich in carbohydrates",
        "Ideal for curries and fries",
    ],
    creatAt:"2025-03-25T07:17:46.018Z",
    updateAt:"2025-03-25T07:17:46.018Z",
    inStock:true,
   } ,
   {
    _id:"fjdkn343",
    name:"Apple 500kg",
    category:"Fruits",
    price:25,
    offerPrice:30,
    image:[appple, potato_1, potato_2],
    description:[
        "Fresh and organic",
        "Rich in carbohydrates",
        "Ideal for curries and fries",
    ],
    creatAt:"2025-03-25T07:17:46.018Z",
    updateAt:"2025-03-25T07:17:46.018Z",
    inStock:true,
   } ,

];

export const features =[
    {
        icon:truck_icon,
        title:"Fastest Delivery",
        description:"Groceries delivered in under 30 minutes.",
    },
    {
        icon:leaf_icon,
        title:"Freshness Guaranteed",
        description:"Fresh produce straight from the source.",
    },
    {
        icon:coin_icon,
        title:"Affordable Prices",
        description:"Quality groceries at unbeatable prices.",
    },
    {
        icon:trust_icon,
        title:"Trusted by Thousands",
        description:"Loved by 10,000+ happy customers.",
    },
];

export const dummyAddress =[
    {
        _id:"123456",
        userId:"123456",
        firstName:"John",
        lastName:"Doe",
        email:"John@gmail.com",
        street:"123 Main St",
        city:"New York",
        state:"NY",
        zipCode:"10001",
        phone:"1234567890",
        country:"USA",
        isDefault:true,
    }

];

export const dummyOrders = [
    {
        _id: "ord123",
        userId: "123456",
        items: [
            {
                product: dummyProducts[2],
                quantity: 2,
                price: 25
            },
           
        ],
        shippingAddress: {
            _id: "123456",
            firstName: "John",
            lastName: "Doe",
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            phone: "1234567890",
            country: "USA"
        },
        amount: 3, // Updated totalAmount
        status: "Delivered",
        paymentStatus: "Paid",
        paymentType: "COC",
        createdAt: "2024-01-15T10:30:00.000Z",
        updatedAt: "2024-01-15T16:45:00.000Z"
    },
    {
        _id: "ord124",
        userId: "123456",
        items: [
            {
                product: dummyProducts[1],
                _id: "item1239748",
                quantity: 1,
                price: 25
            }
        ],
        shippingAddress: {
            _id: "123456",
            firstName: "John",
            lastName: "Doe",
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            phone: "1234567890",
            country: "USA"
        },
        isPaid: false,
        address: dummyAddress[0],
        amount: 3, // Updated totalAmount
        status: "Processing",
        paymentStatus: "Pending",
        paymentType: "COC",
        createdAt: "2024-01-16T09:20:00.000Z",
        updatedAt: "2024-01-16T09:20:00.000Z"
    }
];