import Image from "next/image";
import React from "react";

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Image
        src={"/brand/images/logozaytoona.png"}
        alt="logozaytoona"
        width={600}
        height={600}
      />
    </div>
  );
}

export default LoadingScreen;
