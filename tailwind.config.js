/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html","./src/**/*.{js,jsx,css,html}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    container:{
      center:true,
      padding:'2rem'
    },
    // colors:{
    //   'green-color':'#0aad0a',
    //   'light-color':'#f0f3f2',
    //   'rating-color':'#ffc908',
    //   'gray':'#eee',
    //   'dark':'#000000',
    // }
    // ,
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('flowbite/plugin')
  ],
  darkMode:'class',
}

