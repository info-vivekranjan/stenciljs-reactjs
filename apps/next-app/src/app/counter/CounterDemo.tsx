"use client";

import { useState } from "react";

import { MyCounter } from "react-library";

export default function CounterDemo() {
    const [count, setCount] = useState(10);

    return (
        <div className="max-w-md mx-auto space-y-6">
            <h2 className="text-xl font-bold">
                Next.js + Stencil.js
            </h2>

            <p>
                Count received by React: {count}
            </p>

            <MyCounter
                initialCount={10}
                onCountChanged={(event) => {
                    setCount(event.detail);
                }}
            />
        </div>
    );
}