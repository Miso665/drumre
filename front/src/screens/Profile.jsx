import { Button, Heading, Center, HStack, Avatar, VStack } from "@chakra-ui/react";
import React from "react";
import NavBar from "../components/Navbar";
import { useEffect, useState } from "react";

const Profile = () => {

    const [user, setUser] = useState({});

    useEffect(() => {
        const theUser = localStorage.getItem("user");

        if (theUser && !theUser.includes("undefined")) {
            setUser(JSON.parse(theUser));
        }
    }, []);
    return (
        <>
            <NavBar />
            <Center>
                <VStack>
                    <br />
                    <Avatar size='xl' name={user?.firstName} src={user?.picture} />
                    <Heading size="md">Email: {user?.email}</Heading>
                    <Heading size="md">First name: {user?.firstName}</Heading>
                    <Heading size="md">Last name: {user?.lastName}</Heading>
                </VStack>
            </Center>

        </>
    )

};

export default Profile;