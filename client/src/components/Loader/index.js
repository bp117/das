import React from "react";
import {
  CircularProgress
} from '@material-ui/core'
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="cs-loader-container">
      <CircularProgress />
    </div>
  );
};

export default Loader;
