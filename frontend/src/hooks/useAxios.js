// import { useEffect, useState } from "react"
// import axios from "axios"


// export const useAxios = (url) => {
    
//     const [data , setData] = useState(null)
//     const [isPending , setIsPending] = useState(false)
//     const [error , setError] = useState(null)


//     useEffect(() => {
        
//         const controller = new AbortController()

//         const fetchData = async () => {
//             setIsPending(true)
//             try {
//             const res = await axios.get(url , {signal: controller.signal })
//             // const json = await res.data.json()
//             setIsPending(false)
//             setData(res.data)
//             setError(null)
//             }catch(err){
//                 if (err.name === 'AbortError'){
//                     console.log("fetch was aborted!")
//                 }else{
//                     setIsPending(false)
//                     console.log(err.message)
//                     setError('could not fetch the data')
//                 }
//             }
//         }

//         fetchData()

//         return () => {
//             controller.abort()
//         }

//     } , [url])
    
//     return {data , isPending , error}
// }


import { useState, useEffect } from "react"

export const useAxios = (url , method = 'GET') => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [options , setOptions] = useState(null)

  const postData = (Pdata) => {
    setOptions({
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(Pdata),
    })
  }

  const putData = (Pdata) => {
    setOptions({
      method:"PUT",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(Pdata),
    })
  }


  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async (fetchOptions) => {
      setIsPending(true)
      
      try {
        const res = await fetch(url, {...fetchOptions, signal: controller.signal })

        setIsPending(false)
        setData(res.data)
        setError(null)
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted")
        } else {
          setIsPending(false)
          setError('Could not fetch the data')
        }
      }
    }
    
    if (method === "GET"){
      fetchData()
    }
    if ((method === "POST" || method === 'PUT') && options){
      fetchData(options)
    }
    return () => {
      controller.abort()
    }

  }, [method, options, url])

  return { data, isPending, error , postData, putData}
}