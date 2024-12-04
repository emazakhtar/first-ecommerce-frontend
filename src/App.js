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
import {
  fetchAllUsersOrdersAsync,
  loadUsersInfoAsync,
} from "./features/users/usersSlice";
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
import StripeCheckout from "./pages/StripeCheckout";
import ResetPassword from "./features/auth/components/ResetPassword";
import Navbar from "./features/navbar/Navbar";
import QuickView from "./features/products/components/QuickView";

import LandingPageWithFooter from "./pages/LandingPageWithFooter";
import ReturnExchangeForm from "./features/orders/components/Return";
import AdminReturn from "./features/admin/components/AdminReturn";
import UserReturns from "./features/users/components/UserReturns";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import RatingReviewPage from "./pages/ReviewPage";
import AdminReviews from "./features/admin/components/AdminReviews";
import AdminOrdersDetail from "./features/admin/components/AdminOrderDetails";

const router = createBrowserRouter([
  {
    path: "/all-products",
    element: <Home />,
  },
  {
    path: "/",
    element: <LandingPageWithFooter></LandingPageWithFooter>,
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
    element: <ProductDetailPage />,
  },
  {
    path: "/product-quickview",
    element: (
      <Protected>
        <QuickView></QuickView>
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
    path: "/reset-password",
    element: <ResetPassword></ResetPassword>,
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
        <Navbar>
          <AdminOrderUpdateForm></AdminOrderUpdateForm>
        </Navbar>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-add-form",
    element: (
      <ProtectedAdmin>
        <Navbar>
          <AdminProductEditForm></AdminProductEditForm>
        </Navbar>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/stripe-checkout",
    element: (
      <Protected>
        <StripeCheckout></StripeCheckout>
      </Protected>
    ),
  },
  {
    path: "/exchange/:orderId",
    element: (
      <Protected>
        <Navbar>
          <ReturnExchangeForm></ReturnExchangeForm>
        </Navbar>
      </Protected>
    ),
  },
  {
    path: "/admin-returns",
    element: (
      <Protected>
        <Navbar>
          <AdminReturn></AdminReturn>
        </Navbar>
      </Protected>
    ),
  },
  {
    path: "/user-returns",
    element: (
      <Protected>
        <Navbar>
          <UserReturns></UserReturns>
        </Navbar>
      </Protected>
    ),
  },
  {
    path: "/rate-review/:productId",
    element: (
      <Protected>
        <RatingReviewPage></RatingReviewPage>
      </Protected>
    ),
  },
  {
    path: "/order-detail/:orderId",
    element: (
      <Protected>
        <OrderDetailsPage></OrderDetailsPage>
      </Protected>
    ),
  },
  {
    path: "/admin/reviews",
    element: (
      <ProtectedAdmin>
        <Navbar>
          <AdminReviews></AdminReviews>
        </Navbar>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/order-detail/:orderId",
    element: (
      <ProtectedAdmin>
        <Navbar>
          <AdminOrdersDetail></AdminOrdersDetail>
        </Navbar>
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
      dispatch(fetchAllUsersOrdersAsync());
    }
  }, [dispatch, user]);

  return <div className="App">{<RouterProvider router={router} />}</div>;
}

export default App;
