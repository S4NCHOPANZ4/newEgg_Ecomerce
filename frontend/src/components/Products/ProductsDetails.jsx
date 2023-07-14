import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart";

const ProductsDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=507asdifjasdpdasdifi90");
  };

  
  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => { 
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (data) => {
    const isItemsExists = cart && cart.find((i) => i.id === data.id);

    if (isItemsExists) {
      toast.error("Item already is in cart");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully");
      }
    }
  };



  useEffect(() => {
    if (
      wishlist && data &&
      wishlist.find((i) =>i.id === data.id)
    ) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  return (
    <div className="bg-white">
      {data ? (
        <div className={` ${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full  800px:w-[50%]">
                <img
                  src={data.image_Url[select].url}
                  alt=""
                  className="w-[80%] min-h-[200px] max-h-[400px]"
                />
                <div className="w-full flex">
                  <div
                    className={`${
                      select === 0 ? "border" : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={data ? data.image_Url[0].url : null}
                      alt=""
                      className="h-[200px]"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${
                      select === 1 ? "border" : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={data ? data.image_Url[1].url : null}
                      alt=""
                      className="h-[200px]"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <div className="w-full">
                  <h1 className={`${styles.productTitle} pt-5`}>{data.name}</h1>
                  <p>{data.description}</p>
                  <div className="flex pt-3">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      {data.discount_price}$
                    </h4>
                    <h3 className={`${styles.price}`}>
                      {data.price ? data.price + "$" : null}
                    </h3>
                  </div>

                  <div
                    className={`${styles.normalFlex} mt-12 justify-between pr-3`}
                  >
                    <div>
                      <button
                        className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={decrementCount}
                      >
                        -
                      </button>
                      <span className="bg-gray-200 text-gray-800 font-medium px-5 py-[9px]">
                        {count}
                      </span>
                      <button
                        className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={incrementCount}
                      >
                        +
                      </button>
                    </div>
                    <div>
                      {click ? (
                        <AiFillHeart
                          size={30}
                          className="cursor-pointer"
                          onClick={() => removeFromWishlistHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Remove from wishlist"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={30}
                          className="cursor-pointer"
                          onClick={() => addToWishlistHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Add to wishlist"
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className={`${styles.button} rounded-sm !mt-6 bg-gradient-to-r  from-orange-400 to-orange-500 !h-11 flex items-center`}
                    onClick={()=> addToCartHandler(data)}
                  >
                    <span className="text-white flex items-center">
                      Add to cart <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>
                  <div className="flex items-center pt-8">
                    <img
                      src={data.shop.shop_avatar.url}
                      className="w-[50px] h-[50px] rounded-full mr-2"
                      alt=""
                    />
                    <div className="pr-8">
                      <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">
                        ({data.shop.ratings}) Ratings
                      </h5>
                    </div>
                    <div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = () => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f4f6fb] px-3 800px:px-10 py-2 rounded ">
      <div className="w-full flex justify-evenly border-b  pt-10 pb-2">
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line"> 
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad sint
            nostrum quos, est id accusantium consectetur beatae deserunt labore
            officiis quia dolor nihil recusandae sequi similique, optio aliquid,
            asperiores eaque!
          </p>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad sint
            nostrum quos, est id accusantium consectetur beatae deserunt labore
            officiis quia dolor nihil recusandae sequi similique, optio aliquid,
            asperiores eaque!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad sint
            nostrum quos, est id accusantium consectetur beatae deserunt labore
            officiis quia dolor nihil recusandae sequi similique, optio aliquid,
            asperiores eaque!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad sint
            nostrum quos, est id accusantium consectetur beatae deserunt labore
            officiis quia dolor nihil recusandae sequi similique, optio aliquid,
            asperiores eaque!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad sint
            nostrum quos, est id accusantium consectetur beatae deserunt labore
            officiis quia dolor nihil recusandae sequi similique, optio aliquid,
            asperiores eaque!
          </p>
        </>
      ) : null}
         {active === 2 ? (
        <div className="w-full justify-center min-h-[40vh] flex items-center">
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line"> 
            No reviews yet
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default ProductsDetails;
