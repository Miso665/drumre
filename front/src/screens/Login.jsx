import { Heading, Center, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarAuth from "../components/NavbarAuth";
import useFetch from "../hooks/useFetch";

// https://developers.google.com/identity/gsi/web/reference/js-reference

const Login = () => {
  const { handleGoogle, loading, error } = useFetch(
    "http://localhost:5000/login"
  );

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("loginDiv"), {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "signin_with",
        shape: "pill",
      });

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  return (
    <>
      <NavbarAuth />
      <br />
      <Center>
        <VStack>
          <Heading as="h2" size="md">Login to proceed...</Heading>
          <Heading as="h2" size="md">If you don't have an account: <Link to="/signup">click here</Link></Heading>
        </VStack>
      </Center>
      <br />
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {error && <Heading size="md" style={{ color: "red" }}>{error}</Heading>}
        {loading ? <div>Loading....</div> : <div id="loginDiv"></div>}
      </main>
      <footer></footer>
    </>
  );
};

export default Login;
