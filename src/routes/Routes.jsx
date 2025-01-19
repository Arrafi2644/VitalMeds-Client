import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup.jsx/Signup";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import PrivateRoute from "./PrivateRoute";
import SellerHome from "../pages/Dashboard/SellerHome.jsx/SellerHome";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import ManageMedicines from "../pages/Dashboard/ManageMedicines/ManageMedicines";
import Shop from "../pages/Shop/Shop";
import Cart from "../pages/Dashboard/Cart/Cart";


const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: '/',
          element: <Home></Home>,
        },
        {
          path: 'shop',
          element: <Shop></Shop>
        },
        {
          path: 'dashboard',
          element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
          children: [
            // admin 
            {
              path: 'adminHome',
              element: <PrivateRoute><AdminHome></AdminHome></PrivateRoute>
            },
            {
              path: 'manageUsers',
              element: <PrivateRoute><ManageUsers></ManageUsers></PrivateRoute>
            },
            
            // seller 
            {
              path: 'sellerHome',
              element: <PrivateRoute><SellerHome></SellerHome></PrivateRoute>
            },
            {
              path: 'manageMedicine',
              element: <PrivateRoute><ManageMedicines></ManageMedicines></PrivateRoute>
            },
            
            // user 
            {
              path: 'userHome',
              element: <PrivateRoute><UserHome></UserHome></PrivateRoute>
            },
            {
              path: 'cart',
              element: <PrivateRoute><Cart></Cart></PrivateRoute>
            }
          ]
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <Signup></Signup>
        }

      ]
    },
  ]);

  export default router;