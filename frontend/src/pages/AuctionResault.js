import React from "react";
import Particles from "particlesjs";

const products = [
  {
    id: 1,
    name: "Earthen Bottle",
    href: "#",
    price: 48,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    sale: true,
    saler : 'brad'
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    price: 35,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
    sale: false,
    saler : 'brad'
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "#",
    price: 9 ,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
    sale: false,
    saler : 'brad'
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    href: "#",
    price: 35,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
    sale: false,
    saler : 'brad'
  },

  // More products...
];
export default function AuctionResault() {
  return (
    <>
      <div className="bg-center bg-bg-auctionres w-screen max-h-fit z-0 ">
        <div className="max-w-6xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-3">
          <h2 className="bg-sky-900 py-3 mb-3 text-slate-200	text-center	rounded-lg text-5xl">
            {" "}
            آثار هنری مزایده
          </h2>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            {products.map((product) =>
              product.sale ? (
                <a key={product.id} href={product.href} className="group">
                  <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-2xl text-gray-700">
 {product.name}  : نام اثر 
                  </h3>
                  <p className="mt-1 text-3xl font-medium text-gray-900">
                   {product.price} :  قیمت 
                  </p>
                  <p className="mt-1 text-3xl font-medium text-gray-900">
                   {product.saler}  : خریدار 
                  </p>
                </a>
              ) : (
               
                <div className="hover:cursor-auto opacity-50 z-10 text-center">
                  <div
                    className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 

"
                  >
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="w-full h-full object-center object-cover "
                    />
                  </div>
                  <h3
                    className="mt-4 text-2xl text-gray-700 

"
                  >
 {product.name}  : نام اثر 
                  </h3>
                  <p
                    className="mt-1 text-3xl font-medium text-gray-900 

"
                  >
                     {product.price} :  قیمت 
              </p>
                  <p className="mt-1 text-3xl font-medium text-gray-900">
                  {product.saler}  : خریدار 
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
