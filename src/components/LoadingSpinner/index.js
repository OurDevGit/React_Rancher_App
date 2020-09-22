import React from "react";
import "./styles.scss";

const spinnerImg = require("../../assets/img/spinner.svg");

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <img src={spinnerImg} alt="" />
    </div>
  );
};

export default LoadingSpinner;
