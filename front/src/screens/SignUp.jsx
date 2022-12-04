import { Heading, Center, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarAuth from "../components/NavbarAuth";
import useFetch from "../hooks/useFetch";

// https://developers.google.com/identity/gsi/web/reference/js-reference

const SignUp = () => {
  const { handleGoogle, loading, error } = useFetch(
    "http://localhost:5000/signup"
  );

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "continue_with",
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
          <Heading as="h2" size="md">Sign up to proceed...</Heading>
          <Heading as="h2" size="md">If you already have an account: <Link to="/login">click here</Link></Heading>
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? (
          <div>Loading....</div>
        ) : (
          <div id="signUpDiv" data-text="signup_with"></div>
        )}
      </main>
      <footer></footer>
    </>
  );
};

export default SignUp;
