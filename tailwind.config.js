// tailwind.config.js

module.exports = {
  content: [
    "./src/app/(auth)/**/*.{js,jsx,ts,tsx}", 
    "./src/app/**/*.{js,jsx,ts,tsx}", 
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  // include: [ 
  //   "./src/app/(auth)/index.tsx", 
  //   ".src/app/modal.tsx",
  //   "nativewind-env.d.ts"
  // ],
  theme: {
    extend: {},
  },
  plugins: [],
}