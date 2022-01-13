import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
const withAuth = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const user = localStorage.getItem("user");

      // If there is no access token we redirect to "/" page.
      if (!user) {
        toast.warning("Please Login Frist!");
        Router.push({
          pathname: "/login",
          query: { pathname: Router.asPath },
        });
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;
