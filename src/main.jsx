import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ViewAllUsers from './Components/ViewAllUsers.jsx';
import AddUsers from './Components/AddUsers.jsx';
import UpdateUser from './Components/UpdateUser.jsx';
import Signin from './Components/Signin.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ViewAllUsers></ViewAllUsers>,
    loader: ()=>fetch('http://localhost:5000/userM')
  },
  {
    path: "addusers",
    element: <AddUsers></AddUsers>
  },
  {
    path: "userM/:id",
    element: <UpdateUser></UpdateUser>,
    loader: ({params})=>fetch(`http://localhost:5000/userM/${params.id}`)
  },
  {
    path: 'signin',
    element: <Signin></Signin>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
