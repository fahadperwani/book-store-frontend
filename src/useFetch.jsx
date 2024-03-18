import React, { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetch(url)
        .then((res) => res.json())
        .then((result) => setData(result))
        .catch((err) => console.log(err));
    }

    fetchData();
  }, []);

  return data;
}

export default useFetch;
