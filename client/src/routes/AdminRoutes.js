import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router";

const AdminRoute = ({ component: Component, ...rest }) => {
    const isAdmin = useSelector((state) => state.auth.isAdmin);

    return isAdmin ? (
        <Route component={Component} {...rest} />
    ) : (
        <Redirect to="/auth" />
    );
};

export default AdminRoute;
