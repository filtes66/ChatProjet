import React from "react";
import Header from "./Header";
//import Footer from "./Footer";
import "../Styles/Layout.css";

function Layout(props) {
  return (
    <div className="layout2">
      <div className="layout-body">{props.children}</div>
      {/*     <Footer />*/}
    </div>
  );
}

export { Layout };
