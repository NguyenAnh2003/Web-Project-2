import React, { useContext, useState } from "react";
import { Store } from "../../store/Store.js";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";


export default function ProductCard(props) {
  const navigate = useNavigate();
  const [fillHeart, setFillHeart] = useState(false);
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, savedBox } = state;

  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    // console.log(data.countInStock);
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    console.log(quantity);
    if(data.countInStock < quantity) {
      window.alert('out of stock')
      return;   
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: {...product, quantity},
    });

    navigate('/cart');  
    // localStorage.clear();
  };

  // find exist item in wish list
  const existSavedItem = savedBox.savedItems.find(item => item._id === product._id)

  const addToWishList = async () => {
    setFillHeart(!fillHeart);
    const {data} = await axios.get(`/api/products/${product._id}`);
    console.log(data);
    ctxDispatch({
      type: 'STORE_SAVED',
      payload: {...product}
    })
  }

  const removeFromWhistList = (item) => {
    ctxDispatch({type: "REMOVE_SAVED", payload:item})
    console.log('removed', item);
  }


  return (
    <div className="flex min-w-full cursor-pointer flex-col gap-3 overflow-hidden lg:mb-14 shadow-md">
      <div className="px-2 bg-white rounded">
        <img
          className="w-full h-60 object-cover rounded-t-md"
          src={product.image}
          alt={product.name}
        />
        <div className=" mt-4 text-26 overflow-hidden">
          {/* Content */}
          <div className="min-h-[98px] px-2 mb-2 flex flex-col">
            <div className="mb-2 flex justify-between">
              <h1 className="w-64 text-14 font-bold text-gray-700">
                {product.name}
              </h1>
                {existSavedItem ? (
                  <AiFillHeart
                    fill="#ff5b6a"
                    size={30}
                    className="hover:cursor-pointer"
                    onClick={() => removeFromWhistList(product)}
                  />
                ) : (
                  <AiOutlineHeart fill="#000" onClick={addToWishList} size={30} />
                )}
            </div>
            <div>
              <p className="text-[10px] font-bold text-description-color max-w-[286px] overflow-hidden">
                {product.description}
              </p>
            </div>
          </div>
          {/* Price */}
          <div className="px-2 mb-2 flex flex-col border-t-2 border-[#eeeeee]">
            <h1 className="my-2 font-bold text-price-color">
              {product.price} đ
            </h1>
            <button
              className="py-3 mb-2 rounded bg-primary-btn text-white text-16"
              onClick={addToCartHandler}  
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
