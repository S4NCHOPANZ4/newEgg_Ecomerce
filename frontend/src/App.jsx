import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  SignupPage,
  LoginPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductsDetailsPage,
  ProfilePage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  OrderDetailsPage
} from "./Routes.js";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store.js";
import { loadUser } from "./redux/actions/user";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import axios from "axios";
import { server } from "./server.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const App = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState();

  const getStripeApiKey = async () => {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  };

  const stripePromise = loadStripe(
    "pk_test_51NRlzcK9NJPRcKbSGt1XowudVzn4ikDhNwwXEedM88Fz4C2DAjtoPv8Uh8kSBpCbCk7SY8DQHL0wGd1C0yPlxH6Y00yUmv1n20"
  );

  useEffect(() => {
    Store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <>
      {loading ? 
      <div className="bg-green h-screen flex flex-col justify-center items-center">
        <div className="loader"></div>
      </div> 
      : 
      (
        <BrowserRouter>
          {stripeApiKey && (
            <Elements stripe={stripePromise}>
              <Routes>
                <Route
                  path="/payment"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <PaymentPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Elements>
          )}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/user/activation/:url" element={<ActivationPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductsDetailsPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route path="/order/success" element={<OrderSuccessPage />} />
            <Route path="/user/order/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <OrderDetailsPage />
                </ProtectedRoute>
              }
            />

            <Route path="/events" element={<EventsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
