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
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import "./post.css";

const product = {
  name: "شب پر ستاره",
  price: "5,000,000",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "../img/van-gogh.jpeg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    "شبِ پُرستاره (به هلندی: De sterrennacht) یک نقاشی رنگ روغن است که توسط نقاش و طراح معروف سمبولیسم هلندی، وینسنت ون گوگ، در سال ۱۸۸۹ خلق شده‌است. این اثر نه‌تنها یکی از شاهکارهای ون گوگ است، بلکه به‌عنوان یکی از نمادهای هنر نوگرای اروپا نیز به‌شمار می‌آید",
  highlights: [
    "در سمت چپ اثر، ترکیبی بزرگ، تاریک و تاحدودی مبهم دیده می‌شود که مقیاس‌ها را به هم می‌ریزد و ذهن بیننده را درگیر ماهیت آن می‌کند",
    "در پایین خط افق و در زیر تپه، شهر کوچکی قرار دارد که آرامش در ساختمان‌هایش موج می‌زند",
    "آسمان در شبی پوشیده شده با ابرهایی چرخ‌چرخان، ستارگانی فروزان و هلال درخشان ماه",
    " رنگ‌های تیره خانه‌هایی با پنجره‌های روشن",
  ],
  details:
    "ونگوگ خودش در نامه ای به برادرش این گونه می نویسد که:《امروز صبح، ساعت‌ها قبل از طلوع آفتاب، حومه شهر را از پنجره با کمک نور ستاره‌های صبحگاهی دیدم که بسیار بزرگ به نظر می‌رسیدند.》پنجره‌ای که «ون‌گوگ» درباره آن در نامه‌ به برادرش صحبت کرده بود، پنجره آسایشگاه «سینت پائول» واقع در جنوب فرانسه بود که مدتی را آن سپری کرده بود و این ایده سرچشمه شکل گیری این اثر است",
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Post() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  return (
    <div className="post-page">
      <div className="pt-6">
        {/* <div className='img-post'>
          <img src={vangogh} />
        </div> */}

        {/* Image gallery */}
        <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-1 lg:gap-x-8">
          <div className=" aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
            <img
              src={vangogh}
              alt={product.images[0].alt}
              className="w-full h-full object-center object-cover"
            />
          </div>
          {/* <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <img
                src={product.images[1].src}
                alt={product.images[1].alt}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <img
                src={product.images[2].src}
                alt={product.images[2].alt}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>
          <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
            <img
              src={product.images[3].src}
              alt={product.images[3].alt}
              className="w-full h-full object-center object-cover"
            />
          </div> */}
        </div>

        {/* Product info */}
        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl centertext">
              {product.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:mt-0 lg:row-span-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900 centertext ">
              {product.price}
            </p>
            <p className="mt-4 text-1xl text-gray-900 centertext ">
              1400/05/06
            </p>
            <p className="mt-4 text-1xl text-gray-900 centertext ">
              فروخته شده
            </p>

            {/* Reviews */}
            {/* <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div> */}

            <form className="mt-10">
              {/* Colors  */}
              {/* <div>
                <h3 className="text-sm text-gray-900 font-medium">Color</h3>

                <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a color
                  </RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedClass,
                            active && checked ? "ring ring-offset-1" : "",
                            !active && checked ? "ring-2" : "",
                            "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                          )
                        }
                      >
                        <RadioGroup.Label as="p" className="sr-only">
                          {color.name}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            "h-8 w-8 border border-black border-opacity-10 rounded-full"
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div> */}

              {/* Sizes */}
              <div className="mt-10 like-box">
                <div className="flex items-center flexy">
                  <h3 className="text-sm text-gray-900 font-medium">2k</h3>
                  <a href="#" className=" hover:text-indigo-500">
                    👍
                  </a>
                </div>
              </div>
              <button
                type="submit"
                className="mt-10 w-full bg-sky-900 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 centertext"
              >
                اضافه کردن به سبد خرید
              </button>
            </form>
          </div>

          <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only centertext title">توضیحات</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900 righttext">
                  {product.description}
                </p>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}
