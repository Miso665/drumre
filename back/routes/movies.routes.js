const express = require("express");
const router = express.Router();

const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";

router.get("/", async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect()
        let responseJson = []
        await client.db("drumre").collection("movies").find().forEach(movie => responseJson.push(movie));
        res.status(200).json(responseJson);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: e?.message || e,
        })
    } finally {
        await client.close();
    }

});

router.get("/reviews", async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect()
        let responseJson = []
        await client.db("drumre").collection("reviews").find().forEach(review => responseJson.push(review));
        res.status(200).json(responseJson);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: e?.message || e,
        })
    } finally {
        await client.close();
    }

})

module.exports = router;