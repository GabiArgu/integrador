import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //Utilizamos complementos referidos para crear proyectos react  ejemplo evitar importe manual en jsx
  server: {
    proxy: {
      '/back': {
        target : 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/back/, '')
        //Remplazamos la url original por /^\/back/
      } 
    }
  }
//Configuracion proxy para poder conectar mi front a mi servidor 
})

//Arvhivo vite es un archivo de configuracion donde van a estar opciones de configuracion del proyecto
