import { useEffect, useState } from "react";

export default function Example() {
  const [ap_name, setApName] = useState("");
  const [ap_describe, setApDescribe] = useState("");
  const [yes, setApYes] = useState("");
  const [no, setApNo] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handlechangeApName = (event) => {
    setApName(event.target.value);
  };
  const handlechangeApDescribe = (event) => {
    setApDescribe(event.target.value);
  };

  const handlechangeApYes = (event) => {
    setApYes(event.target.value);
  };
  const handlechangeApNo = (event) => {
    setApNo(event.target.value);
  };
  // const handleApSubmit = (e) => {
  //   e.preventDefault();
  //   addpost(
  //     ap_name,
  //     ap_describe
  //   );
  // };

  //  useEffect(() => {
  //   if (selectedImage) {
  //     setImageUrl(URL.createObjectURL(selectedImage));
  //     console.log(selectedImage)
  //   }
  // }, [selectedImage]);
  
    return (
      <>
        <div className="h-screen bg-gradient-to-b from-cyan-600 to-cyan-900"	>
          <div className="md:grid md:grid-cols-3 md:gap-6 righttext">
            <div className="mt-5 md:mt-0 md:col-span-2 righttext ">
              <form method="get"/* onSubmit={handleApSubmit} */	>
                <div className="shadow sm:rounded-md sm:overflow-hidden righttext  ">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6 bg-indigo-200">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700 righttext" >
                          نام اثر
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          value={ap_name}
                          onChange={handlechangeApName}
                          type="text"
                          name="name"
                          id="name"
                          autoComplete="given-name"
                          className="p-3 righttext text-3xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full border border-gray-300 rounded-md"
                        />
                        </div>
                      </div>
                    </div>
  
                    <div>
                      <label htmlFor="about" className="righttext block text-sm font-medium text-gray-700">
                        توضیحات
                      </label>
                      <div className="mt-1">
                        <textarea
                          value={ap_describe}
                          onChange={handlechangeApDescribe}
                          id="about"
                          name="about"
                          rows={10}
                          className="p-3	righttext text-3xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div>
                    </div>
  
                    <div>
                      <label className="righttext block text-sm font-medium text-gray-700">فایل عکس</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
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
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input onChange={(e) => setSelectedImage(e.target.files[0])} id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                    <fieldset>
                      <legend className="righttext contents text-base font-medium text-gray-900">آیا قصد فروش این اثر را دارید؟</legend>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <input
                            id="yes"
                            name="yes"
                            type="radio"
                            onChange={handlechangeApYes}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label className="righttext ml-3 block text-sm font-medium text-gray-700">
                            بله
                          </label>
                        </div>
                        <div className="righttext flex items-center">
                          <input
                            id="no"
                            name="no"
                            type="radio"
                            onChange={handlechangeApNo}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label className="righttext ml-3 block text-sm font-medium text-gray-700">
                            خیر
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>      
                </div>
              </form>
              <button
                      type="submit"
                      className="m-2 text-2xl	inline-flex justify-center py-2 px-4 border border-transparent shadow-sm rounded-md text-black bg-amber-300 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      ثبت اثر
                    </button>
            </div>
          </div>
        </div>
      </>
    )
  }
  