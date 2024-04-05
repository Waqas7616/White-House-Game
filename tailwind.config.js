/* @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        redish: "#ED1C24",
        redShade: "#ED1C244D",
        lightBlue: "#546BED",
        blueShade: "#454C72",
        blackColor: "#000",
        whiteColor: "#FFF",
      },
      fontFamily: {
        poppins: "'Poppins', sans-serif",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        "lg-a": "1149px",
        xl: "1280px",
        "xl-a": "1460px",
        "acer": "1910px",
        "2xl": "2000px",

      },
      height: {
        bannerHeight: "500px",
      },
      backgroundImage: {
        'banner-image': "url('../src/images/banner.png')",

      },


    },
  },
  variants: {
    extend: {
      textColor: ['hover'], // Enable hover variant for textColor
    },
  },
  plugins: [
    // require("@tailwindcss/forms")
  ],
};