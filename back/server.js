const express = require("express");
const app = express();
require("dotenv/config");
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";

const connectToDB = async (profile, signup) => {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    //let db = database.db('drumre');
    let db = client.db("drumre");

    // Make the appropriate DB calls
    //await listDatabases(client);
    /*databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));*/
    if (signup) {
      await db.collection("users").insertOne({ email: profile?.email })
    } else {
      let osoba = await db.collection("users").findOne({ email: profile?.email })
      console.log(osoba)
      return true
    }

    //console.log(db.users.find())

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);
app.use(express.json());

// Our database
let DB = [];

/**
 *  This function is used verify a google account
 */
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
}

app.post("/signup", async (req, res) => {
  try {
    // console.log({ verified: verifyGoogleToken(req.body.credential) });
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;
      connectToDB(profile, true);

      res.status(201).json({
        message: "Signup was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: jwt.sign({ email: profile?.email }, "myScret", {
            expiresIn: "1d",
          }),
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occured. Registration failed.",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      const existsInDB = connectToDB(profile, false);

      if (!existsInDB) {
        return res.status(400).json({
          message: "You are not registered. Please sign up",
        });
      }

      res.status(201).json({
        message: "Login was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          }),
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
});

app.listen("5000", () => console.log("Server running on port 5000"));
