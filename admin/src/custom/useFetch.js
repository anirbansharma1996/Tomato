import axios from "axios";
import React, { useEffect, useState } from "react";

export default function useFetch(URL) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const f = async () => {
      try {
        setLoading(true);
        const res = await axios.get(URL);
        setLoading(false);
        if (res.status === 200) {
          setData(res.data);
        } else {
          setError("something went wrong 400");
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        setError("something went wrong 505");
      }
    };
    f();
  }, []);

  return { data, loading, error };
}
