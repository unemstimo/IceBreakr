import Image from "next/image";
import React from "react";
import ExampleAd from "~/assets/images/eucalyptus-oil-ad.png";

const Advertisement: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center object-cover">
      <div className="max-w-[800px]">
        <Image
          className="object-cover"
          src={ExampleAd}
          alt="Eucalyptus Oil Ad"
        />
      </div>
    </div>
  );
};

export default Advertisement;
