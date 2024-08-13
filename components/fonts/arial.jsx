import localFont from "next/font/local";
export const arial = localFont({
  src: [
    {
      path: "../../public/assets/fonts/Arimo.ttf",
      weight: "400",
    },
    {
      path: "../../public/assets/fonts/Arimo.ttf",
      weight: "700",
    },
  ],
  variable: "--font-Arimo",
});