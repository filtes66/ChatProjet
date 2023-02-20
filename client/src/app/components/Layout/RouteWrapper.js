import React, { useContext, useEffect } from "react";
import { Route, Redirect, useParams } from "react-router-dom";

function RouteWrapper(props) {
  const { component: Component, path, exact, layout: Layout } = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

export default RouteWrapper;
