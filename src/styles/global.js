  
import styled, { createGlobalStyle } from "styled-components";
import BootstrapContainer from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

export const RequiredAsterisk = styled.span`
  color: red;
  &:after {
    content: "*";
  }
`;

export const Container = styled(BootstrapContainer)`
  margin-top: 25px;
  margin-bottom: 25px;
  display: flex;
  flex: 1 0 auto;
  flex-direction: ${(props) => props.flexdirection};
`;

export const FullSizeContainer = styled(Container)`
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
`;

export const CenteredForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
`;

export const FullWidthFormRow = styled(Form.Row)`
  width: 100%;
`;

export const FullWidthFormGroup = styled(Form.Group)`
  width: 100%;
`;

export const Centered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const FlexDiv = styled.div`
  display: flex;
`;

export default createGlobalStyle`
  /* BOOTSTRAP OVERRIDES */
  input.form-control[type="checkbox"] {
    width: 16px;
  }
  .modal-content {
    background-color: "#201e20";
    button.close {
      color: "#fff";
    }
  }
  /*
  .btn.btn-primary {
    background-color: "#004599";
    border-color: "#004599";
  }
  */
  /* CUSTOM STYLES */
  #gatsby-focus-wrapper {
    display: flex;
    flex-direction: column;
  }
  html, body, #___gatsby, #gatsby-focus-wrapper {
    height: 100%;
  }
  body {
    background-color: "#201e20";
    color: "#fff";
    transition: background 0.2s ease-out;
  }
  .text-muted {
    color: "#96a2ad" !important;
  }
  /*
  a {
    color: "#f21131";
  }
  a:hover {
    color: "#8b8e95";
  }
  */
  .swal-icon.swal-icon--custom {
    width: 250px;
    margin: 0 auto;
  }
  .hvr-underline-from-center {
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    position: relative;
    overflow: hidden;
  }
  .hvr-underline-from-center:before {
    content: "";
    position: absolute;
    z-index: -1;
    left: 51%;
    right: 51%;
    bottom: 0;
    background: #f21131;
    height: 4px;
    -webkit-transition-property: left, right;
    transition-property: left, right;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
  }
  .hvr-underline-from-center:hover:before, .hvr-underline-from-center:focus:before, .hvr-underline-from-center:active:before, .hvr-underline-from-center[aria-current="page"]:before {
    left: 0;
    right: 0;
  }
`;