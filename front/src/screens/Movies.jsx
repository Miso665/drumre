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
    Input, Spinner
} from "@chakra-ui/react";
import NavBar from "../components/Navbar";

const Movies = () => {
    const [selected, setSelected] = useState("movies");
    const [movieData, setMovieData] = useState([]);
    const [reviewData, setReviewData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true)
        if (selected === "movies") {
            try {
                const response = await fetch("http://localhost:5000" + `/movies/`,
                    {
                        method: "GET",
                        mode: "cors",
                        headers: {
                            "Content-type": "application/json"
                        }
                    });

                let jsonData = await response.json();
                setMovieData(jsonData);

            } catch (err) {
                console.log(err.message);
            }
        } else {
            try {
                const response = await fetch("http://localhost:5000" + `/movies/reviews/`,
                    {
                        method: "GET",
                        mode: "cors",
                        headers: {
                            "Content-type": "application/json"
                        }
                    });

                let jsonData = await response.json();
                setReviewData(jsonData);

            } catch (err) {
                console.log(err.message);
            }
        }
        setLoading(false)


    }

    useEffect(() => {
        fetchData();
    }, [selected]);

    function datumTranslate(param) {
        try {
            let [date, time] = param.split('T')
            let [year, month, day] = date.split('-')

            return `${day}.${month}.${year}`;
        } catch (err) {
            return param
        }

    }

    function changeSelected() {
        if (selected === "movies") setSelected("reviews")
        else setSelected("movies")
    }
    return (
        <>
            <NavBar />
            <Center>

                <VStack w="70%">
                    <br />
                    <HStack>
                        <Button onClick={() => changeSelected()}> Movies</Button>
                        <Button onClick={() => changeSelected()}> Reviews </Button>
                    </HStack>
                    <br />
                    {loading ? <Spinner /> : <></>}
                    {selected === "movies" ? <>
                        <Table variant="striped" colorScheme="teal">
                            <Thead>
                                <Tr>
                                    <Th>Naziv filma
                                    </Th>
                                    <Th>Datum izlaska
                                    </Th>
                                    <Th>Duljina (min)
                                    </Th>
                                    <Th>Ocjena
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {Object.values(movieData).map((movie) => {
                                    return (
                                        <>
                                            <Tr>
                                                <Td>{movie.name}</Td>
                                                <Td>{datumTranslate(movie.release_date)}</Td>
                                                <Td>{movie.runtime}</Td>
                                                <Td>{movie.rating}</Td>
                                            </Tr>
                                        </>
                                    )
                                })}
                            </Tbody>
                        </Table></> : <>
                        <Table variant="striped" colorScheme="teal">
                            <Thead>
                                <Tr>
                                    <Th>Naziv članka
                                    </Th>
                                    <Th>Sažetak
                                    </Th>
                                    <Th>Datum izlaska
                                    </Th>
                                    <Th>Kritičar
                                    </Th>

                                </Tr>
                            </Thead>
                            <Tbody>
                                {Object.values(reviewData).map((review) => {
                                    return (
                                        <>
                                            <Tr>
                                                <Td>{review.headline}</Td>
                                                <Td>{review.summary_short}</Td>
                                                <Td>{datumTranslate(review.publication_date)}</Td>
                                                <Td>{review.byline}</Td>
                                            </Tr>
                                        </>
                                    )
                                })}
                            </Tbody>
                        </Table></>}

                </VStack>
            </Center>
        </>
    )
};

export default Movies;