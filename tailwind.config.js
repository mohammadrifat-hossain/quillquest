/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: ['hover'],
      textColor: ['hover'],
    },
    screens:{
      'xl': {'max':'1200px'},
      'lg': {'max':'1080px'},
      'md-lg': {'max':'991px'},
      'md': {'max':'768px'},
      'sm': {'max':'576px'},
      'xs': {'max':'480px'},
      '2xs': {'max':'340px'},
    }
  },
  plugins: [],
}
