import React from "react";
import styles from "../../styles/styles";

function Sponsored() {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-start">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJtO51n76cv_QGjvA0ZpNlKcFI4cnYD5p2Ig&usqp=CAU"
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start">
          <img
            src="data:image/png;base64,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"
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://logolook.net/wp-content/uploads/2022/08/Razer-Logo.png"
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start">
          <img
            src="data:image/png;base64,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"
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Sponsored;
