

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
        "Content-Type": "application/json",
        "Authorization": `Token ${JSON.parse(localStorage.getItem("token"))}`
      },
      body: JSON.stringify(Pdata),
    })
  }

  const putData = (Pdata) => {
    setOptions({
      method:"PATCH",
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Token ${JSON.parse(localStorage.getItem("token"))}`
      },
      body: JSON.stringify(Pdata),
    })
  }


  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async (fetchOptions) => {
      setIsPending(true)
      
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Token ${JSON.parse(localStorage.getItem("token"))}`
      }

      try {
        const res = await fetch(url, {...fetchOptions, headers: headers , signal: controller.signal })
        const jres = await res.json()
        console.log(jres)
        setIsPending(false)
        setData(jres)
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