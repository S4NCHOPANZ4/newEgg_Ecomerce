import React from "react";
import UserOrderDetails from "../components/Profile/UserOrderDetails";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";

const OrderDetailsPage = () => {
  return (
    <div>
      <Header />
      <UserOrderDetails />
      <Footer />
    </div>
  );
};

export default OrderDetailsPage;
