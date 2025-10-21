import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url';
import { dirname } from 'node:path';
import path from 'path';
import fs from 'fs';
import plugin from '@vitejs/plugin-react';
import child_process from 'child_process';
import { env } from 'process';

// https://vite.dev/config/
export default defineConfig({
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
