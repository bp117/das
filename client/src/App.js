import React from "react";
import App from "./pages/App";
import { Helmet } from 'react-helmet';
function ContainerApp() {
  return (
    <>
      <Helmet>
        <title>EDAS Console</title>
      </Helmet>
      <App />
    </>
  );
}

export default ContainerApp;
