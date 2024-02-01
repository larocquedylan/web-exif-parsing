import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Ascii from './routes/Ascii';
import Exif from './routes/Exif';
import Home from './routes/Home';
import { ImageProvider } from './components/ImageContent/ImageContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/ascii',
    element: <Ascii />,
  },
  {
    path: '/exif',
    element: <Exif />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ImageProvider>
      <RouterProvider router={router} />
    </ImageProvider>
  </React.StrictMode>,
);
