import React from "react";

import Layout from "../api/Layout";
import { Centered } from "../styles/global";

const ErrorComponent = ({ error, errorInfo }) => (
  <Centered>
    <h1>Uh oh!</h1>
    <p>Something went wrong!</p>
    <details
      style={{ whiteSpace: "pre-wrap", maxHeight: "50%", overflowY: "auto" }}
    >
      {error && error.toString()}
      <br />
      {errorInfo.componentStack}
    </details>
  </Centered>
);

const fn = ({ children }) => (
  <Layout errorComponent={ErrorComponent}>{children}</Layout>
);

export default fn;