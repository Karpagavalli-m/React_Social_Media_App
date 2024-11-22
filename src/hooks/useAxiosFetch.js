import axios from 'axios'
import  { useEffect, useState } from 'react'


const useAxiosFetch = (dataUrl) => {
    const [data,setData]=useState([])
    const [fetchError,setfetchError]=useState('')
    const [isLoading,setIsLoading]=useState(false)

    useEffect(()=>{
        const isMounted=true;
        const source=axios.CancelToken.source()
        const fetchData = async () =>
        {
            try{
                setIsLoading(true)
                const response= await axios.get(dataUrl,{CancelToken:source.token})
                if(isMounted)
                {
                    setData(response.data);
                    setfetchError('')
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

            fetchData()

            function cleanUp()
            {
            const isMounted=false;
            source.cancel()
            }
         return cleanUp()

    },[dataUrl])
  return {data,fetchError,isLoading}
}

export default useAxiosFetch