import React from "react";
import PropTypes from "prop-types";

import AuthUserContext from "./context";
import Firebase, { withFirebase } from "../Firebase";

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    _initFirebase = false;
    _isMounted = false;
    state = {
      authUser: null,
    };

    safeSetState = (state) => this._isMounted && this.setState(state);

    firebaseInit = () => {
      if (this.props.firebase && !this._initFirebase) {
        this._initFirebase = true;

        this.listener = this.props.firebase.onAuthUserListener(
          (authUser) => {
            localStorage.setItem("authUser", JSON.stringify(authUser));
            this.safeSetState({ authUser });
          },
          () => {
            localStorage.removeItem("authUser");
            this.safeSetState({ authUser: null });
          }
        );
      }
    };

    componentDidMount() {
      this._isMounted = true;
      this.safeSetState({
        authUser: JSON.parse(localStorage.getItem("authUser")),
      });

      this.firebaseInit();
    }

    componentDidUpdate() {
      this.firebaseInit();
    }

    componentWillUnmount() {
      this._isMounted = false;
      this.listener && this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component>{this.props.children}</Component>
        </AuthUserContext.Provider>
      );
    }
  }

  WithAuthentication.displayName = "WithAuthentication";

  WithAuthentication.propTypes = {
    children: PropTypes.node.isRequired,
    firebase: PropTypes.instanceOf(Firebase),
  };

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
