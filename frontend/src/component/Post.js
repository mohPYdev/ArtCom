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
import like from "../img/like--post.png";
import icon1 from "../img/add-to-cart.png";
import warning from '../img/warning.png';
const artwork = {
  name: "شب پر ستاره",
  price: "5,000,000",
  liked: false,
  like_count: 2500,
  artist: "",
  sold: true,
  image_url: vangogh,
  description:
    "شبِ پُرستاره (به هلندی: De sterrennacht) یک نقاشی رنگ روغن است که توسط نقاش و طراح معروف سمبولیسم هلندی، وینسنت ون گوگ، در سال ۱۸۸۹ خلق شده‌است. این اثر نه‌تنها یکی از شاهکارهای ون گوگ است، بلکه به‌عنوان یکی از نمادهای هنر نوگرای اروپا نیز به‌شمار می‌آید",
};

export default function Post() {
  const [sold, setSold] = useState(artwork.sold);
  const [liked, setLiked] = useState(artwork.liked);
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
    const like_btn = document.getElementById("like--btn");
    if (liked) {
      
      like_btn.style.pointerEvents="none";
      like_btn.classList.add("grayscale");
    }
    else{
      like_btn.classList.remove("grayscale")
    }
  }, [liked]);
  return (
    <div className="post-page">
      <div className="pt-6">
        {/* Image  */}
        <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-1 lg:gap-x-8">
          <div className=" aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
            <img
              src={artwork.image_url}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        {/* artwork info */}
        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl centertext">
              {artwork.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:mt-0 lg:row-span-3">
            <p className="text-3xl text-gray-900 centertext ">
              {artwork.price}
            </p>
            <p className="mt-4 text-1xl text-gray-900 centertext ">
              1400/05/06
            </p>
              {/* like */}
              <div className="mt-10 like-box">
                <div className="flex items-center justify-center">
                  <h3 className="mr-5 text-3xl text-gray-900 font-medium">2 k</h3>
                  <button className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="like--btn">
                    <img src={like} className="icon" />
                  </button>
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
              <img src={warning} className="icon" />
              <p className=" mx-5 text-3xl text-gray-900 font-medium invisible" id="sold--label">
              فروخته شده
            
            </p>
            <img src={warning} className="icon" />
            </div>

          </div>

          <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            {/* Description  */}
            <div>
              <h3 className="sr-only centertext title">توضیحات</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900 righttext">
                  {artwork.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
