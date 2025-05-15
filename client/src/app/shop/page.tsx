"use client";
import React, { Suspense } from "react";
import ShopComponent from "./_components/ShopComponent";

function Shop() {
  return (
    <Suspense fallback={<div>Loading...</div>}>{<ShopComponent />}</Suspense>
  );
}

export default Shop;
