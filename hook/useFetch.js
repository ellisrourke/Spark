import { useState, useEffect } from "react";
import axios from "axios";

import { RAPID_API_KEY } from '@env'


const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

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
        setIsLoading(true);
        try {
            const response = await axios.request(options);
            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setIsError(error)
            alert(`There is an error. ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetchData = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, isError, refetchData };
}

export default useFetch;
