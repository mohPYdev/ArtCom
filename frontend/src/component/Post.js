/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import vangogh from "../img/van-gogh.jpeg";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import "./post.css";
import like from "../img/like.png";
import icon1 from "../img/add-to-cart.png";
import warning from "../img/warning.png";
import getPostInfo from "../function/getPostInfo";
import { useParams } from "react-router-dom";

import {useAxios} from "../hooks/useAxios";

export default function Post() {
  const { postId, artistId } = useParams();

  const likedbtn = "likedbtn"
  const unlikedbtn = "unlikedbtn" 

  //State
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [liked, setLiked] = useState();
  const [likeCount, setLikeCount] = useState();
  const [artist, setArtist] = useState();
  const [sold, setSold] = useState();
  const [image, setImage] = useState();
  const [description, setDescription] = useState();


  const {postData:postLike} = useAxios(`http://localhost:8000/post/${artistId}/posts/${postId}/like/`,'POST');
  const {postData:postDislike} = useAxios(`http://localhost:8000/post/${artistId}/posts/${postId}/dislike/`,'POST');

  //func
  const likeHandler = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prevcount) => prevcount - 1);
      postDislike();
    } else {
      setLiked(true);
      setLikeCount((prevcount) => prevcount + 1);
      postLike();
    }
  };


  //useEffect
  useEffect(() => {
    if (sold) {
      const sold_btn = document.getElementById("sold--btn");
      const sold_label = document.getElementById("sold--label");
      sold_label.classList.remove("invisible");
      sold_btn.style.opacity = 0.2;
      sold_btn.style.pointerEvents = "none";
    }
  }, [sold]);


  useEffect(() => {
    async function fetchData() {
      const { image, name, description, price, like_count, liked } =
        await getPostInfo(artistId, postId);
      setImage(image);
      setName(name);
      setDescription(description);
      setPrice(price);
      setLikeCount(like_count);
      setLiked(liked);
    }
    fetchData();
  }, [artistId, postId]);


  return (
    <div className="post-page">
      <div className="pt-6">
        {/* Image  */}
        <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-1 lg:gap-x-8">
          <div className=" aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
            <img
              src={image}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        {/* artwork info */}
        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl centertext">
              {name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:mt-0 lg:row-span-3">
            <p className="text-3xl text-gray-900 centertext ">{price}</p>
            <p className="mt-4 text-1xl text-gray-900 centertext ">
              1400/05/07
            </p>
            {/* like */}
            <div className="mt-10 ">
              <div className="flex items-center justify-center">
                <h3 className="mr-5 text-3xl text-gray-900 font-medium">
                  {likeCount}
                </h3>
                  <img
                    src={like}
                    className={liked ? likedbtn : unlikedbtn}
                    alt=""
                    onClick={likeHandler}
                  />
              </div>
            </div>
            <button
              className="mt-10 w-full bg-sky-900 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 centertext"
              id="sold--btn"
            >
              اضافه کردن به سبد خرید
              <img src={icon1} className="shopping-icon icon" />
            </button>
            <div className=" mt-10 flex items-center justify-center">
              {sold ? <img src={warning} className="icon" /> : <></>}
              <p
                className=" mx-5 text-3xl text-gray-900 font-medium invisible"
                id="sold--label"
              >
                فروخته شده
              </p>
              {sold ? <img src={warning} className="icon" /> : <></>}
            </div>
          </div>

          <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            {/* Description  */}
            <div>
              <h3 className="sr-only centertext title">توضیحات</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900 righttext">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
