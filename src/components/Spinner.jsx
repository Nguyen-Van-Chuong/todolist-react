import React from "react";
// import { css } from "@emotion/react";
import { FadeLoader } from "react-spinners";

const Spinner = ({ loading }) => {
  const color = "#318CE7";
  return (
    <div className="flex justify-center spinner-container">
      <FadeLoader
        loading={loading}
        color={color}
        className={`
        
       
        `}
        size={150} /* Kích thước của spinner */
      />
    </div>
  );
};

export default Spinner;
