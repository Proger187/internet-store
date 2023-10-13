import Admin from "./pages/Admin";
import AdminProducts from "./pages/AdminProducts";
import Auth from "./pages/Auth";
import CartPage from "./pages/CartPage";
import { Home } from "./pages/Home";
import MyOrderPage from "./pages/MyOrderPage";
import MyOrders from "./pages/MyOrders";
import OrderPage from "./pages/OrderPage";
import ProductPage from "./pages/ProductPage";


export const adminRoutes = [
    {
        path:'/admin',
        Component: Admin
    },
    {
        path:"/product-update/:id",
        Component:ProductPage
    },
    {
        path:"/admin/order/:id",
        Component:OrderPage
    },
    {
        path:"/admin/products",
        Component:AdminProducts
    }
]
export const authRoutes =[
    {
        path:"/cart",
        Component:CartPage
    },
    {
        path:"/orders",
        Component:MyOrders
    },
    {
        path:"/order/:id",
        Component:MyOrderPage
    }
]

export const publicRoutes = [
    {
        path:"/home",
        Component:Home
    },
    {
        path:"/auth",
        Component:Auth
    }
]