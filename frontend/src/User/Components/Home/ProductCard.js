import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import ShowCardRating from "../Ratting/ShowCardRating";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await axios.get(`/api/products?page=${currentPage}`);
        if (response.data.products && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
          setIsDataFetched(true);
        } else {
          setIsDataFetched(true);
          throw new Error("Products data is not an array");
        }
        setError(null);
      } catch (error) {
        setIsDataFetched(true);
        setError(error.message);
      }
    };

    getAllProducts();
  }, [currentPage]);

  if (error) {
    return <p>Error: {error} </p>;
  }

  if (!isDataFetched) {
    return (
      <div className="flex items-center bg-white z-30 justify-center w-full h-screen absolute top-20 right-0.5">
        <img
          src="/pikachu.gif"
          alt="Pikachu"
          className="w-20 h-20 object-contain mb-16"
        />
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((item) => (
          <Link
            key={item._id}
            to={`/products/${item._id}`}
            className="group block border rounded-md shadow-md overflow-hidden hover:shadow-lg"
          >
            <div className="relative w-full pb-[66.67%] overflow-hidden">
              {" "}
              {/* Maintains a 3:2 aspect ratio */}
              <img
                src={`/images/${item.photo}`}
                alt={item.name}
                className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
              />
            </div>
            <div className="p-2">
              <h2 className="text-sm font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600">
                ${item.price ? item.price.toFixed(1) : "N/A"}
              </p>
            </div>
            <div className="relative bottom-0 flex items-center px-2">
              <ShowCardRating
                className=" absolute bottom-0"
                productId={item._id}
                size="small"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
