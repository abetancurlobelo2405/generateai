import { useState, useEffect } from "react";

export default function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      const res = await fetch("/api/xd");
      const data = await res.json();
      setData(data);
    }
    getData();
  }, []);

  return <div>{data ? <p>{data.hello}</p> : <p>Loading...</p>}</div>;
}
