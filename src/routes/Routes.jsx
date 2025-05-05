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
import ManageCategory from "../pages/Dashboard/ManageCategory/ManageCategory";
import AskForAdvertisement from "../pages/Dashboard/AskForAdvertisement/AskForAdvertisement";
import ManageAdvertise from "../pages/Dashboard/ManageAdvertise/ManageAdvertise";
import AdminRoute from "./AdminRoute";
import Checkout from "../pages/Dashboard/Checkout/Checkout";
import Invoice from "../pages/Dashboard/Invoice/Invoice";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ManagePayments from "../pages/Dashboard/ManagePayments/ManagePayments";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import SalesReport from "../pages/Dashboard/SalesReport/SalesReport";
import SellerPaymentHistory from "../pages/Dashboard/SellerPaymentHistory/SellerPaymentHistory";
import Blog from "../pages/Blog/Blog";
import MyOrders from "../pages/MyOrders/MyOrders";


const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorPage></ErrorPage>,
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
         path: 'blog',
         element: <Blog></Blog>
        },
        {
          path: 'dashboard',
          element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
          children: [
            // admin 
            {
              path: 'adminHome',
              element: <PrivateRoute><AdminRoute><AdminHome></AdminHome></AdminRoute></PrivateRoute>
            },
            {
              path: 'manageUsers',
              element: <PrivateRoute><AdminRoute><ManageUsers></ManageUsers></AdminRoute></PrivateRoute>
            },
            {
              path: 'manageCategory',
              element: <PrivateRoute><AdminRoute><ManageCategory></ManageCategory></AdminRoute></PrivateRoute>
            },
            {
              path: 'manageAdvertise',
              element: <PrivateRoute><AdminRoute><ManageAdvertise></ManageAdvertise></AdminRoute></PrivateRoute>
            },
            {
              path: 'managePayment',
              element: <PrivateRoute><ManagePayments></ManagePayments></PrivateRoute>
            },
            {
              path: 'salesReport',
              element: <PrivateRoute><SalesReport></SalesReport></PrivateRoute>
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
            {
              path: 'advertisement',
              element: <AskForAdvertisement></AskForAdvertisement>
            },
            {
              path: 'sellerPaymentHistory',
              element: <PrivateRoute><SellerPaymentHistory></SellerPaymentHistory></PrivateRoute>
            },
            
            // user 
            {
              path: 'userHome',
              element: <PrivateRoute><UserHome></UserHome></PrivateRoute>
            },
            {
              path: 'paymentHistory',
              element: <PaymentHistory></PaymentHistory>
            },
            {
              path: 'myOrders',
              element: <MyOrders/>
            }
           
          ]
        },
        {
          path: 'cart',
          element: <PrivateRoute><Cart></Cart></PrivateRoute>
        },
        {
          path: 'checkout',
          element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
        },
        {
          path: 'invoice',
          element: <PrivateRoute><Invoice></Invoice></PrivateRoute>
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