'use client'
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState();
  const [count, setCount] = useState(0);

  async function handleClick(){
    const res = await fetch('http://localhost:3000/api/rate-limit');

    const js = await res.json();
    setData(js.message);
    setCount(count+1);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 justify-center items-center sm:items-start">
        <h1 className="text-5xl font-bold">Rate Limit</h1>
        {data && <h2>{data}: {count}</h2>}
        <button onClick={handleClick} className="bg-green-500 font-bold p-2 rounded-lg">Fetch</button>
      </main>
    </div>
  );
}
