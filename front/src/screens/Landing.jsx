import { Center, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";

const Landing = () => {
  return (
    <>
      <NavBar />
      <br />
      <Center>
        <Heading>Sign up, login, or browse movies...</Heading>
      </Center>
    </>
  );
};

export default Landing;
