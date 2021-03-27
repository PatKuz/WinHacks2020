import React, { Component, Fragment, createElement } from "react";
import PropTypes from "prop-types";

import { FirebaseContext, getFirebase } from "./Firebase";
import { withAuthentication } from "./Session";

// eslint-disable-next-line react/prop-types
let LayoutBase = ({ children }) => <Fragment>{children}</Fragment>;
LayoutBase.displayName = "LayoutBase";

const AppWithAuthentication = withAuthentication(({ children }) => (
  <LayoutBase>{children}</LayoutBase>
));

AppWithAuthentication.displayName = "AppWithAuthentication";

class Layout extends Component {
  state = {
    firebase: null,
    error: null,
    errorInfo: null,
  };

  componentDidMount() {
    const app = import("firebase/app");
    const auth = import("firebase/auth");
    const firestore = import("firebase/firestore");
    const storage = import("firebase/storage");
    const functions = import("firebase/functions");

    Promise.all([app, auth, firestore, storage, functions]).then((values) => {
      const firebase = getFirebase(values[0]);

      this.setState({ firebase });
    });
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.error)
      return (
        <LayoutBase>
          {createElement(this.props.errorComponent, {
            error: this.state.error,
            errorInfo: this.state.errorInfo,
          })}
        </LayoutBase>
      );

    return (
      <FirebaseContext.Provider value={this.state.firebase}>
        <AppWithAuthentication>{this.props.children}</AppWithAuthentication>
      </FirebaseContext.Provider>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  errorComponent: PropTypes.func,
};

Layout.displayName = "Layout";

Layout.defaultProps = {
  // eslint-disable-next-line react/display-name, react/prop-types
  errorComponent: ({ error, errorInfo }) => (
    <div>
      <h1>Uh oh!</h1>
      <p>Something went wrong!</p>
      <details style={{ whiteSpace: "pre-wrap" }}>
        {error && error.toString()}
        <br />
        {/* eslint-disable-next-line react/prop-types */}
        {errorInfo.componentStack}
      </details>
    </div>
  ),
};

export const setLayoutBase = (Component) => {
  LayoutBase = Component;
};

export default Layout;
