import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCartAsync } from "./features/cart/cartSlice";
import {
  checkUserAsync,
  selectCheckedUser,
  selectLoggedInUserToken,
} from "./features/auth/authSlice";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import PageNotFound from "./pages/404";
import MyOrdersPage from "./pages/MyOrdersPage";
import { loadUsersInfoAsync } from "./features/users/usersSlice";
import Logout from "./features/auth/components/Logout";
import ProfilePage from "./pages/ProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminProductListPage from "./pages/AdminProductListPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminProductEditForm from "./features/admin/components/AdminProductEditForm";
import AdminOrderUpdateForm from "./features/admin/components/AdminOrderUpdateForm";
import {
  fetchBrandAsync,
  fetchCategoryAsync,
} from "./features/products/productSlice";

const router = createBrowserRouter([
  {
    path: "/",

    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/my-cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage />
      </Protected>
    ),
  },
  {
    path: "/my-orders",
    element: (
      <Protected>
        <MyOrdersPage></MyOrdersPage>
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSuccessPage></OrderSuccessPage>
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: (
      <Protected>
        <Logout></Logout>
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <ProfilePage></ProfilePage>
      </Protected>
    ),
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: "/admin/orders",

    element: (
      <ProtectedAdmin>
        <AdminOrdersPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/home",
    element: (
      <ProtectedAdmin>
        <AdminProductListPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-edit-form/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductEditForm></AdminProductEditForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/order-update-form/:id",
    element: (
      <ProtectedAdmin>
        <AdminOrderUpdateForm></AdminOrderUpdateForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-add-form",
    element: (
      <ProtectedAdmin>
        <AdminProductEditForm></AdminProductEditForm>
      </ProtectedAdmin>
    ),
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUserToken);
  const checkedUser = useSelector(selectCheckedUser);
  useEffect(() => {
    if (!user) {
      dispatch(checkUserAsync());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      dispatch(loadUsersInfoAsync());
      dispatch(fetchAllCartAsync());
      dispatch(fetchBrandAsync());
      dispatch(fetchCategoryAsync());
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      {checkedUser && <RouterProvider router={router} />}
    </div>
  );
}

export default App;
