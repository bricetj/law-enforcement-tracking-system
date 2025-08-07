/*
 * Brice Jenkins and Andrew Heilesen
 * Copyright: 2025
 * 
 * Citation for the following code:
 * Date: 7/31/2025
 * Copied from Canvas starter code on
 * Activity 2 - Connect webapp to database (Individual).
 * Source URL: https://canvas.oregonstate.edu/courses/2007765/assignments/10118865?module_item_id=25664551
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
