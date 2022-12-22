import { useState, useEffect } from "react";

export default function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      const res = await fetch("/api/xd");
      console.log(res);
      const data = await res.json();
      console.log(data);
      setData(data);
    }
    getData();
  }, []);

  return <div>{data ? <p>{data.message}</p> : <p>Loading...</p>}</div>;
}
