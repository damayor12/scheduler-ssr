import { useState, useEffect } from 'react';

const baseUrl = ` http://localhost:3031/data`;

export const useFetch = () => {
  const [data, setData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading('loading...');

      try {
        const response = await fetch(`${baseUrl}`);

        if (!response) throw new Error(response.statusText);

        const data = await response.json();

        setLoading(false);

        setIsSuccess(true);
        setData(data);

        setError(null);
      } catch (error) {
        setLoading(false);
        setError('An error occurred. Awkward..');
      }
    };

    fetchData();
  }, []);

  return { data, loading, error, setData, isSuccess };
};
