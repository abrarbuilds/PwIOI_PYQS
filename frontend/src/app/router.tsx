import { createBrowserRouter, Navigate } from 'react-router-dom'
import { BrowsePapersPage } from '../pages/BrowsePapersPage'
import { HomePage } from '../pages/HomePage'
import { PaperDetailPage } from '../pages/PaperDetailPage'
import { RootLayout } from './RootLayout'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/papers', element: <BrowsePapersPage /> },
      { path: '/papers/:paperId', element: <PaperDetailPage /> },
      { path: '*', element: <Navigate to="/papers" replace /> },
    ],
  },
])
