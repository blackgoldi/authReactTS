import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base:'/authReactTS',
  plugins: [react()],
  server:{
   proxy: {   
      '^/api/': {
        target: 'http://localhost:3000', // адрес вашего Express сервера
      },
    },
    port:5173 
  },
})
