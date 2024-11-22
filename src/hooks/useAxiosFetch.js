import axios from 'axios'
import  { useEffect, useState } from 'react'


const useAxiosFetch = (dataUrl) => {
    const [data,setData]=useState([])
    const [fetchError,setfetchError]=useState('')
    const [isLoading,setIsLoading]=useState(false)

    useEffect(()=>{
        let isMounted=true;
        const source=axios.CancelToken.source()
        const fetchData = async (dataUrl) =>
        {
            try{
                setIsLoading(true)
                const response= await axios.get(dataUrl,{cancelToken:source.token})
                if(isMounted)
                {
                    setData(response.data);
                    setfetchError(null)
                }
          
                }catch(err)
                {
                        if(isMounted)
                        {
                            setfetchError(err.message)
                            setData([])
                        }
                }finally{
                    isMounted && setTimeout(()=>setIsLoading(false),2000)
                }
            }

            fetchData(dataUrl)

            function cleanUp()
            {
            isMounted=false;
            source.cancel()
            }
         return cleanUp

    },[dataUrl])
  return {data,fetchError,isLoading}
}

export default useAxiosFetch
