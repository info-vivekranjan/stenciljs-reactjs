"use client";

import { MyComponent } from "react-library";

export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-bold">Home</h1>
      <MyComponent first="Vivek" middle="Sunita" last="Ranjan" />
    </>
  );
}
