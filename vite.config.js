// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   // define: {
//   //   //env setup
//   //   // __APP_ENV__: JSON.stringify(env.APP_ENV),
//   //   // 'process.env.VITE_KEY' : JSON.stringify(process.env.VITE_KEY)
    
//   // },
//   }
  

// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    define: {
      'process.env': {
        NODE_ENV: JSON.stringify(mode)
      }
    }
  };
});

