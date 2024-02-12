import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import {nextui} from "@nextui-org/react";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        darker: ['Darker Grotesque', ...fontFamily.sans]
      },
    },
    screens: {
      'sm': '576',
      // => @media (min-width: 640px) { ... }

      'md': '960',
      // => @media (min-width: 768px) { ... }

      'lg': '1440',
      // => @media (min-width: 1024px) { ... }
    }
  },
  plugins: [],
} satisfies Config;
