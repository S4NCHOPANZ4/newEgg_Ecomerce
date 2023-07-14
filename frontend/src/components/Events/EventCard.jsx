import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown"

const EventCard = ({active}) => {
  return (
    <div className={`w-full block bg-white rounded-lg ${active? "unset" : "mb-12"} lg:flex p-2 `}>
      <div className="w-full lg:w-[50%] m-auto h-500">
        <img
          className="w-[600px] h-[325px] 800px:h-[450px]"
          src="https://media.steelseriescdn.com/thumbs/filer_public/81/22/812278bb-fd40-4492-a49e-2bef9840b572/apex_pro_tkl_black_imgbuy_1.png__1850x800_crop-scale_optimize_subsampling-2.webp"
          alt=""
        />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>APEX PRO TKL </h2>
        <p>
        The world's fastest and most advanced keyboard performs effortlessly for all undertakings, whether you need the fastest keystrokes in gaming to destroy the competition, or deliberate presses for typing accuracy – the power is yours to wield.
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
            230.99 $ 
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              189.99 $
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#444a55e]">
            120 Sold 
          </span>
        </div>
        <CountDown />
      </div>
    </div>
  );
};

export default EventCard;
