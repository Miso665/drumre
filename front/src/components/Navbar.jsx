import { Flex, Heading, Link, useColorModeValue, Button, HStack, Avatar } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";

export default function NavBar() {
    let navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        const theUser = localStorage.getItem("user");

        if (theUser && !theUser.includes("undefined")) {
            setUser(JSON.parse(theUser));
        }
    }, []);
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
    const signup = () => {
        navigate("/signup")
    }

    const login = () => {
        navigate("/login")
    }

    const logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    };

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
            <Link href="/profile">
                <Heading as="h4" size="md" ml={10} isTruncated>
                    Profile
                </Heading>
            </Link>
            <Link href="/movies">
                <Heading as="h4" size="md" ml={10} isTruncated>
                    Movies
                </Heading>
            </Link>
            {user?.email ? <>
                <HStack position="absolute" right="3%">
                    <Avatar size='md' name={user?.firstName} src={user?.picture} />
                    <Heading as="h4" size="sm" ml={10} isTruncated>
                        {user?.email}
                    </Heading>
                    <Button
                        onClick={logout}
                        colorScheme="red"
                    >
                        Log out
                    </Button>
                </HStack>
            </> : <>
                <HStack position="absolute" right="3%">

                    <Button onClick={signup}>
                        Sign Up
                    </Button>

                    <Button onClick={login} colorScheme="teal">
                        Login
                    </Button>
                </HStack>
            </>}
        </Flex>
    );
};