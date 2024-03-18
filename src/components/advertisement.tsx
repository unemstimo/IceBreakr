
import Image from "next/image";
import React from "react";
import ExampleAd from "~/assets/images/eucalyptus-oil-ad.png";
import { Card } from "./ui/card";

const Advertisement: React.FC = () => {
  return (
    <Card className="flex h-auto w-auto flex-col items-center justify-center object-cover">
      <Image
          width={800}
          src={ExampleAd}
          alt="Eucalyptus Oil Ad"
        />
    </Card>
  );
};

export default Advertisement;
