import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Flex,
    Center,
    Heading,
    VStack,
    HStack,
    Button,
    Text,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Avatar,
    Tooltip,
    Input
} from "@chakra-ui/react";
import NavBar from "../components/Navbar";

const Movies = () => {
    return (
        <>
            <NavBar />
            <Center>
                <Table w="70%" variant="striped" colorScheme="teal">
                    <Thead>
                        <Tr>
                            <Th>Ime
                            </Th>
                            <Th>Datum
                            </Th>
                            <Th>Nesto
                            </Th>
                            <Th>Nesto
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {/* TODO */}
                    </Tbody>
                </Table>
            </Center>
        </>
    )
};

export default Movies;