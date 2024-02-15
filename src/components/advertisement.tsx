import Image from "next/image";
import React from "react";
import ExampleAd from "~/assets/images/eucalyptus-oil-ad.png";

const Advertisement: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center object-cover">
      <Image className="object-cover" src={ExampleAd} alt="Eucalyptus Oil Ad" />
    </div>
  );
};

export default Advertisement;
