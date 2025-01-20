import { useEffect, useState } from "react";

export function useGet(url, token) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setIsLoading(true);
    
    const options ={
      headers: token ? {
        'Authorization' : ` Bearer ${token}`
      } 
      :{}
    }

    fetch(url , options)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [url]);

  return { data, error, isLoading };
}