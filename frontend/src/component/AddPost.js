import { useEffect, useState } from "react";
import axios from "axios";
import { useAlert } from "react-alert";

import BackToHome from "./BackToHome";

import painter_line from "../img/painter-line.png";
import color_img from "../img/color_img.png"; 

export default function Example() {
  const [ap_name, setApName] = useState("");
  const [ap_describe, setApDescribe] = useState("");
  const [ap_price, setApPrice] = useState("");
  const [forSale, setForSale] = useState(false);

  //file button
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const alert = useAlert();

  const clearForm = () => {
    setApName("");
    setApDescribe("");
    setApPrice("");
    setForSale(false);
    setSelectedImage(null);
  }

  const handlechangeApName = (event) => {
    setApName(event.target.value);
  };
  const handlechangeApDescribe = (event) => {
    setApDescribe(event.target.value);
  };

  const handlechangeApYes = (event) => {
    setForSale(true);
  };
  const handlechangeApNo = (event) => {
    setForSale(false);
  };
  const handlechangeApPrice = (event) => {

    setApPrice(event.target.value);
  }

  const handleApSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', ap_name);
    formData.append('description', ap_describe);
    formData.append('price', parseFloat(ap_price));
    formData.append('image', selectedImage);
    formData.append('for_sale', forSale);

    let url = 'http://localhost:8000/post/posts/';
    axios.post(url, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
      .then(res => {
        console.log(res);
        alert.success('پست با موفقیت ساخته شد')
        clearForm()
      })
      .catch(err => console.log(err))

  };




  return (
    <div className="overflow-x-hidden">
      <BackToHome />
      <div className="h-fit w-screen bg-gradient-to-b from-rose-200 to-rose-100"	>
      <img src={painter_line} className="absolute bottom-0 right-0 w-2/6" />
      <img src={color_img} className="absolute left-0 top-0 w-1/3" />
        <div className="w-2/5 py-16 mx-auto shadow sm:rounded-md sm:overflow-hidden">
          <form className="rounded-2xl px-4 py-5 bg-cyan-900 space-y-6 sm:p-6 " onSubmit={handleApSubmit}>
            <div className=" grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-3">
                <label htmlFor="company-website" className="block text-3xl font-medium text-rose-200 text-right" >
                  نام اثر
                </label>
                <div className=" mt-1 flex rounded-md shadow-sm">
                  <input
                    value={ap_name}
                    onChange={handlechangeApName}
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="given-name"
                    className="font-bold p-3 righttext text-3xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-3">
                <label htmlFor="company-website" className="block text-3xl font-medium text-rose-200 text-right" >
                  (تومان) قیمت اثر
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    value={ap_price}
                    onChange={handlechangeApPrice}
                    type="number"
                    name="price"
                    id="name"
                    autoComplete="given-name"
                    className="font-bold p-3 text-3xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="about" className="block text-3xl font-medium text-rose-200 text-right">
                توضیحات
              </label>
              <div className="mt-1">
                <textarea
                  value={ap_describe}
                  onChange={handlechangeApDescribe}
                  id="about"
                  name="about"
                  rows={6}
                  className="font-bold p-3	righttext text-3xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
            </div>
            <div>
              <label className="block text-3xl font-medium text-rose-200 text-right">فایل عکس</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {!selectedImage && <svg
                    className="mx-auto h-20 w-20 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>}
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <img id='exhi_image_addex' src={imageUrl} />
                      <input onChange={(e) => setSelectedImage(e.target.files[0])} id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    {!selectedImage && <p className="pl-1 text-rose-200">or drag and drop</p>}
                  </div>
                  <p className="text-xs text-rose-200">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
            <fieldset>
              <legend className="text-3xl font-medium text-rose-200 text-right">آیا قصد فروش این اثر را دارید؟</legend>
              <div className="space-x-10 float-right mr-20 flex gap-20 mt-5">
                <div className="flex items-center translate-x-2/4">
                  <input
                    id="yes"
                    name="yes"
                    type="radio"
                    onChange={handlechangeApYes}
                    {...(forSale ? { checked: true } : {})}
                    className="accent-[#d63031]"
                  />
                  {/* <label className="righttext ml-3 block text-sm font-medium text-rose-200">
                    بله
                  </label> */}

                  <label className="ml-3  text-rose-200 text-3xl">
                    بله
                  </label>
                  
                </div>
                <div className="righttext flex items-center translate-x-2/4">
                  <input
                    id="no"
                    name="yes"
                    type="radio"
                    {...(!forSale ? { checked: true } : {})}
                    onChange={handlechangeApNo}
                    className="accent-[#d63031] "
                  />
                  {/* <label className="righttext ml-3 block text-sm font-medium text-rose-200">
                    خیر
                  </label> */}

                  <label className="ml-3  text-rose-200 text-3xl">
                  خیر
                  </label>

                </div>
              </div>
            </fieldset>
            <hr></hr>
            <div className="text-center">
              <button
                type="submit"
                className="w-2/6 text-center font-bold py-2 px-4 duration-300 hover:-translate-y-1 hover:scale-110 text-4xl  py-4 px-6 border border-transparent shadow-sm rounded-md text-black bg-[#B4D5CE] hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                ایجاد اثر
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
