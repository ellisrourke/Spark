import { useState, useEffect } from "react";
import axios from "axios";

import { RAPID_API_KEY } from '@env'

function rejectDelay(reason, t=2000){
    return new Promise(function(resolve, reject){
        setTimeout(reject.bind(null, reason), t);
    });
  }

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const max_retries = 3;


    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: { ...query },
        //params: {query: 'Python developer in Texas, USA', page: '1', num_pages: '1'},
        headers: {
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    const fetchData = async () => {
        try {
            console.log('API Called')
            const response = await axios.request(options);
            setData(response.data.data);
            setIsLoading(false);
        } finally {
            {}
        }
    }

    

    useEffect(() => {
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }

        async function fetchDataAsync(retries){
            setIsLoading(true);
            try {
                await fetchData();
                return {success: true, message: "Data fetched successfully"}
            } catch (error) {
                if (retries > 0) {
                    await sleep(1500);
                    return fetchDataAsync(retries - 1);
                } else {
                    setIsError(error)
                    console.log(error.message)
                    return {success: false, message: error.message}
                }
            } finally {
                setIsLoading(false);
            }
        }
        fetchDataAsync(max_retries)
        //fetchData();
    }, []);

    const refetchData = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, isError, refetchData };
}

export default useFetch;
