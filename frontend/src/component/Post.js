
import vangogh from "../img/van-gogh.jpeg";
import { useEffect, useState } from "react";
import { StarIcon, UsersIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import "./post.css";
import like from "../img/like.png";
import icon1 from "../img/add-to-cart.png";
import warning from "../img/warning.png";
import getPostInfo from "../function/getPostInfo";
import { useParams } from "react-router-dom";
import { useAlert} from "react-alert";

import {useAxios} from "../hooks/useAxios";
import { useAuthContext } from '../hooks/useAuthContext'
import BackToHomePost from "./BackToHomePost";

export default function Post() {
  const { postId, artistId } = useParams();

  const likedbtn = "likedbtn"
  const unlikedbtn = "unlikedbtn" 

  const {user} = useAuthContext()
  const alert = useAlert()

  //State
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [liked, setLiked] = useState();
  const [likeCount, setLikeCount] = useState();
  const [artist, setArtist] = useState();
  const [sold, setSold] = useState();
  const [image, setImage] = useState();
  const [description, setDescription] = useState();
  const [forpay, setForPay] = useState(false)
  const [orderId, setOrderId] = useState()



  const {data:orders } = useAxios(`http://artcom-sjavanmard.fandogh.cloud/post/orders/`)

  const {postData:postPay} = useAxios(`http://artcom-sjavanmard.fandogh.cloud/post/posts/${postId}/payment/`, 'POST')
  const {postData:postWal} = useAxios(`http://artcom-sjavanmard.fandogh.cloud/auth/users/remove/wallet/`, 'POST')

  const handlepayment =() => {
    if (user.wallet >= price){
      postPay()
      postWal({'wallet' : price})
      setSold(true)
    }
    else{
      alert.error("موجودی کیف پول شما کافی نیست")
    }
  }



  // call a function before unloading to another page
  // useEffect(() => {
  //   if (!orderId) return ;
  //   if (sold) return ;

  //   function fetchData() {
  //     const headers = {
  //       "Content-Type": "application/json",
  //       "Authorization": `Token ${JSON.parse(localStorage.getItem("token"))}`
  //     }
  
  //     fetch(`http://artcom-sjavanmard.fandogh.cloud/post/orders/${orderId}/`, {headers: headers, method:'DELETE', keepalive:true} )
  //     .then((response) => response.json())
  //     .then(newpost => {
  //       console.log("leaving page")
  //     })
  //   }


  //    window.addEventListener("beforeunload", () => {   
  //         if (!sold){
  //         postWal({'wallet' : 30000})
  //         fetchData();
  //       }

  //   }
  //   , false);

  //   // return () => {
  //   //   window.removeEventListener("beforeunload", () => {
  //   //       postWal({'wallet' : 30000})
  //   //       fetchData();
  //   //   }
  //   //   , false);
  //   // }

  // }, [orderId,sold]);



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
      const { image, name, description, price, like_count, liked, } =
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


  useEffect(() => {
    if (orders){
      for (const order of orders){
        if (order.post == postId && user.username == order.user){
          setForPay(true)
          setOrderId(order.id)
        }
      }
   }
  }, [orders, postId, user])


  return (
    <div className="post-page h-screen">
      <div className="pt-6 h-screen">
        <BackToHomePost sold={sold}  orderId={orderId} />
        {/* Image  */}
        <div className="h-3/5 mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="h-full mx-auto my-auto rounded-lg overflow-hidden lg:block border-sky-900 border-solid border-2">
            <img
              src={image}
              className="mx-auto my-auto min-h-[50%] min-w-[50%] max-h-full max-w-full"
              
            />
          </div>
        </div>

        {/* artwork info */}
        <div className="h-2/5 max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
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
            { forpay && <button
              className="mt-10 w-full bg-sky-900 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 centertext"
              id="sold--btn"
              onClick={handlepayment}
            >
              پرداخت
              <img src={icon1} className="shopping-icon icon" />
            </button>}
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
