import { Flex, Heading, Link, useColorModeValue, Button, HStack } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";

export default function NavbarAuth() {
    let navigate = useNavigate();

    const logout = async (e) => {
        e.preventDefault();
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            //setAuth(false);
            //toast.success("Uspješno ste se odjavili!");
            navigate('/login');
            window.location.reload(false);
        } catch (err) {
            console.error(err.message);
        }
    };

    /*const checkAuthenticated = async () => {
      try {
        const res = await fetch("http://localhost:5000" + "/auth/verify", {
          method: "POST",
          headers: { jwt_token: localStorage.token }
        });
  
        const parseRes = await res.json();
  
        parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      } catch (err) {
        console.error('checkAuthenticated error: ', err.message);
      }
    };
  
    useEffect(() => {
      checkAuthenticated();
    }, []);
  
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    const setAuth = boolean => {
      setIsAuthenticated(boolean);
    };*/
    const back = () => {
        navigate("/")
    }

    return (
        <Flex
            bg={useColorModeValue("teal.300", "gray.800")}
            color={useColorModeValue("black", "white")}
            minH="60px"
            py={{ base: "2" }}
            px={{ base: "4" }}
            borderBottom="1"
            borderStyle={"solid"}
            borderColor={useColorModeValue("gray.200", "gray.900")}
            align="center"
        >
            <Link href="/">
                <Heading>Movie-findr</Heading>
            </Link>
            <HStack position="absolute" right="3%">

                <Button onClick={back}>
                    Back
                </Button>
            </HStack>
        </Flex>
    );
};