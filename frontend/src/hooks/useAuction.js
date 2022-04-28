import { useEffect, useState } from "react"
import axios from "axios"


export const useAuction = (url) => {
    
    const [data , setData] = useState(null)
    const [isPending , setIsPending] = useState(false)
    const [error , setError] = useState(null)


    useEffect(() => {
        
        const controller = new AbortController()

        const fetchData = async () => {
            setIsPending(true)
            try {
            const res = await axios.get(url , {signal: controller.signal })
            // const json = await res.data.json()
            setIsPending(false)
            setData(res.data)
            setError(null)
            }catch(err){
                if (err.name === 'AbortError'){
                    console.log("fetch was aborted!")
                }else{
                    setIsPending(false)
                    console.log(err.message)
                    setError('could not fetch the data')
                }
            }
        }

        fetchData()

        return () => {
            controller.abort()
        }

    } , [url])
    
    return {data , isPending , error}
}