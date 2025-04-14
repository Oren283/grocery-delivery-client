import React, { useState, useEffect } from 'react'
import { assets } from '../../assets/assets';

const categories = [
  { path: "Vegetables" },
  { path: "Fruits" },
  { path: "Meat" },
  { path: "Dairy" },
  { path: "Beverages" },
  { path: "Snacks" }
];

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');

  useEffect(() => {
    // Cleanup function to revoke object URLs when component unmounts or files change
    return () => {
      files.forEach(file => {
        if (file) {
          URL.revokeObjectURL(URL.createObjectURL(file));
        }
      });
    };
  }, [files]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  }

  return (
    <div className="py-10 flex flex-col justify-between bg-white">
            <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-4xl mx-auto w-full">
                <div>
                    <p className="text-base font-medium mb-2">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
                                <input onChange={(e) => {
                                    const updatedFiles = [...files];
                                    updatedFiles[index] = e.target.files[0];
                                    setFiles(updatedFiles);
                                }}
                                 accept="image/*" type="file" id={`image${index}`} hidden />
                                <img 
                                    src={files[index] ? URL.createObjectURL(files[index]) : assets.upload} 
                                    alt="uploadArea" 
                                    width={100} 
                                    height={100} 
                                    className="border border-gray-300 rounded-lg p-2"
                                />
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <label className="text-base font-medium w-32" htmlFor="product-name">Product Name</label>
                    <input onChange={(e) => setName(e.target.value)} value={name}
                    id="product-name" type="text" placeholder="Type here" className="flex-1 outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex items-start gap-4">
                    <label className="text-base font-medium w-32 pt-2" htmlFor="product-description">Description</label>
                    <textarea onChange={(e) => setDescription(e.target.value)} value={description}
                    id="product-description" rows={4} className="flex-1 outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
                </div>
                <div className="flex items-center gap-4">
                    <label className="text-base font-medium w-32" htmlFor="category">Category</label>
                    <select onChange={(e) => setCategory(e.target.value)} value={category}
                     id="category" className="flex-1 outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40">
                        <option value="">Select Category</option>
                        {categories.map((item, index) => (
                            <option key={index} value={item.path}>{item.path}</option>
                        ))}
                    </select>
                </div>
                <div className="flex md:flex-row flex-col md:items-center gap-4">
                    <label className="text-base font-medium md:w-32">Price</label>
                    <div className="flex-1 flex md:flex-row flex-col items-center gap-4">
                        <div className="flex-1 flex items-center gap-2 w-full">
                            <input onChange={(e) => setPrice(e.target.value)} value={price}
                            id="product-price" type="number" placeholder="Regular Price" className="w-full outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                        </div>
                        <div className="flex-1 flex items-center gap-2 w-full">
                            <input onChange={(e) => setOfferPrice(e.target.value)} value={offerPrice}
                            id="offer-price" type="number" placeholder="Offer Price" className="w-full outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-32"></div>
                    <button className="px-8 py-2.5 bg-primary text-white font-medium rounded hover:bg-primary-dull transition-colors">ADD</button>
                </div>
            </form>
        </div>
  )
}

export default AddProduct