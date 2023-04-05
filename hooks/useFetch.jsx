import {useEffect, useState} from "react"

function UseFetch(url) {
    const [data, setData] = useState({})
    
    useEffect(() => {
        if(url) {  
            fetch(url)
                .then(response => response.json())
                .then(data => setData(data))
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [url])
    
    return {data}
}

export {UseFetch}