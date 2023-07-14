import React from "react";
import styles from "../../../styles/styles";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}`}
      style={{
        backgroundImage:
          "url(https://media.steelseriescdn.com/thumbs/filer_public/c4/be/c4be6982-2fa4-4721-87d1-71b0bf178848/arctis_nova_pro_lp_hero.png__1320x1320_crop-scale_optimize_subsampling-2.webp)",
      }}
    >
      <div className={`${styles.section} w-[50%] 800px:w-[60%] bg-[#00000081] p-5 rounded-md flex flex-col justify-center items-center`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#ffffff] font-[600] capitalize`}
        >
          There are headsets.<br /> Then there's Arctis <br /> Nova
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#ffffffba] ">
        </p>
        <Link to="/product/ARCTIS-PRO-+-GAMEDAC-WHITE" className="inline-block">
            <div className={`${styles.button} mt-5`}>
                <span className="text-[#fff] font-[Poppins] text-[18px]">
                    Shop Now
                </span>
            </div>
        </Link>
      </div>

    </div>
  );
};

export default Hero;
