import React, { useEffect } from "react";
import UseRequest from "../../hooks/useRequest";
import Router from "next/router";

const Signout = () => {
    const { doRequest } = UseRequest({
        url: "/api/users/signout",
        method: "post",
        body: {},
        onSuccess: () => Router.push("/"),
    });

    useEffect(() => {
        doRequest();
    }, []);

    return <div>Signing you out...</div>;
};

export default Signout;
