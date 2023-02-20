import React from "react";
import Header from "./Header";
//import Footer from "./Footer";
import "../Styles/Layout.css";

function Layout1(props) {
  return (
    <div className="layout1">
      <Header />
      <div className="layout-body">{props.children}</div>
      {/*     <Footer />*/}
    </div>
  );
}

function Layout2(props) {
  return (
    <div className="layout2">
      <div className="layout-body">{props.children}</div>
      {/*     <Footer />*/}
    </div>
  );
}

export { Layout1, Layout2 };
