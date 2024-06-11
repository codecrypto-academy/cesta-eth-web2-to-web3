import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Inicio } from './Inicio'
import { Productos } from './Productos'
import { Cesta } from './Cesta'
import { Producto } from './Producto'
import './index.css'

import { createContext } from 'react'

export const Contexto = createContext()

const clienteConsultas = new QueryClient()

function Aplicación() {
  const [estado, setEstado] = React.useState({
    cesta:[]
  })
  return (    
  <React.StrictMode>
    <Contexto.Provider value={[estado, setEstado]}>
      <QueryClientProvider client={clienteConsultas}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Inicio/>}>
              <Route index element={<Productos/>} />
              <Route path="*" element={<Productos/>} />
              <Route path="productos" element={<Productos/>} />
              <Route path="cesta" element={<Cesta/>} />
              <Route path="productos/:idProducto" element={<Producto/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Contexto.Provider>
  </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Aplicación></Aplicación>
)
