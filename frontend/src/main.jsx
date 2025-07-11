import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'  // ✅ Make sure this is correct

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
    <ChakraProvider> {/* ✅ Wrap your app */}
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
