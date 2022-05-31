import React, { useEffect } from "react";
import { useState } from "react";
import Particles from "particlesjs";
import { useParams, useNavigate } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import {useAuthContext} from '../hooks/useAuthContext'
import BackToHome from "../component/BackToHome";

export default function AuctionBefore() {

    const {id} = useParams();
    const {user} = useAuthContext()
    const {data:auction} = useAxios("https://artcom-sjavanmard.fandogh.cloud/post/auctions/"+id+"/");
  
    const navigate = useNavigate();



  return (
    <>
    <BackToHome />
     <div className="bg-cover bg-center bg-bg-auctionres w-screen h-screen pb-96">
       <div className="max-w-6xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-3">
         <h2 className="bg-sky-900 py-3 mb-3 text-slate-200	text-center	rounded-lg text-5xl">
           {" "}
           آثار هنری مزایده
         </h2>

         <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
           {auction ? auction.post.map((post) =>
              <div key={post.id} className="group">
                 <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                   <img
                     src={post.image}
                     alt={post.image}
                     className="w-full h-full object-center object-cover group-hover:opacity-75"
                   />
                 </div>
                 <h3 className="text-center mt-4 text-2xl text-gray-700">
                         {post.name}  : نام اثر 
                 </h3>
                 <p className="text-center mt-1 text-3xl font-medium text-gray-900">
                  {post.price} :  قیمت 
                 </p>
                 </div>
             ): <></>
           } 
         </div>
       </div>
     </div>
  </>
);
  
}
