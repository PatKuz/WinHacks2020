import React, { Component, createElement } from "react";
import PropTypes from "prop-types";
import omit from "lodash.omit";

import AuthUserContext from "./context";
import Firebase, { withFirebase } from "../Firebase";

export class WithAuthorizationClass extends Component {
  _initFirebase = false;
  static contextType = AuthUserContext;

  firebaseInit = () => {
    if (this.props.firebase && !this._initFirebase) {
      this._initFirebase = true;

      this.listener = this.props.firebase.onAuthUserListener(
        this.props.firebaseAuthNext,
        this.props.firebaseAuthFallback
      );
    }
  };

  componentDidMount() {
    this.firebaseInit();
  }

  componentDidUpdate() {
    this.firebaseInit();
  }

  componentWillUnmount() {
    this.listener && this.listener();
  }

  render() {
    const authUser = this.context;
    const filteredProps = omit(this.props, [
      "firebase",
      "firebaseAuthNext",
      "firebaseAuthFallback",
      "condition",
      "authorizationPassed",
      "authorizationFailed",
    ]);
    return this.props.condition(authUser)
      ? createElement(this.props.authorizationPassed, filteredProps)
      : this.props.authorizationFailed;
  }
}
WithAuthorizationClass.displayName = "WithAuthorizationClass";

WithAuthorizationClass.propTypes = {
  firebase: PropTypes.instanceOf(Firebase),
  firebaseAuthNext: PropTypes.func.isRequired,
  firebaseAuthFallback: PropTypes.func.isRequired,
  condition: PropTypes.func.isRequired,
  authorizationPassed: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.elementType,
  ]).isRequired,
  authorizationFailed: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.elementType,
  ]).isRequired,
};

let WithAuthorizationWrapper = (props) => <WithAuthorizationClass {...props} />;
export const setWithAuthorizationWrapper = (Component) => {
  WithAuthorizationWrapper = Component;
};

const withAuthorization = (condition) => (Component) => {
  // eslint-disable-next-line react/prop-types
  const WithCondition = (props) => (
    <WithAuthorizationWrapper
      condition={condition}
      authorizationPassed={Component}
      {...props}
    />
  );
  WithCondition.displayName = "WithCondition";

  return withFirebase(WithCondition);
};
export default withAuthorization;
