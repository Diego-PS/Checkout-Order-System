import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { HomePage, OrderPage } from '@pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/order',
    element: <OrderPage />,
  },
])

export const Router = () => <RouterProvider router={router} />
