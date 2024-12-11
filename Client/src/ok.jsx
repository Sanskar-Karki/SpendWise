import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Income from './components/Income/Income';
import Expense from './components/Expense/Expense';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './NotFound';

const router = createBrowserRouter([
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Dashboard />} />
      <Route path='income' element={<Income />} />
      <Route path='expense' element={<Expense />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
