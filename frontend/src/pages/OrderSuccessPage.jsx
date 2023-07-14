import React from "react";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {

  return (
    <div className="h-[60vh] flex justify-center items-center">
      <h5 className="text-[25px] text-[#000000a1]">
        Your order was successful!
      </h5>

    </div>
  );
};

export default OrderSuccessPage;