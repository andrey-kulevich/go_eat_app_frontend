import {useCallback, useState} from "react";


export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback( async (url, method, body) => {
        setLoading(true)
        try{
            let headers:any = {}
            if(body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(`https://localhost:44399/${url}`, {method, body, headers})
            let data = null
            if (method === 'POST' || method === 'GET') data = await response.json()
            if(!response.ok) console.log(Error(data ? data.message : 'Something wrong'))
            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    },[])

    const clearError = () => setError(null)

    return {loading, request, error, clearError }
}
