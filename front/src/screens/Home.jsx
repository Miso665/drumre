import { Button, Heading, Center } from "@chakra-ui/react";
import React from "react";
import NavBar from "../components/Navbar";

// Pass User
const Home = ({ user }) => {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <>
      <NavBar />
      <div style={{ textAlign: "center", margin: "3rem" }}>
        <Heading size="lg">Dear {user?.firstName} {user?.lastName}</Heading>
        <Center>
          <Heading size="lg">Thank you for using our services</Heading>
        </Center>
        <br />
      </div>
    </>
  );
};

export default Home;
