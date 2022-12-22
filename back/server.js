const express = require("express");
const app = express();
require("dotenv/config");
const cors = require("cors");

const routers = {
  '/': require('./routes/auth.routes'),
  '/movies': require('./routes/movies.routes')
}

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);
app.use(express.json());

for (const path in routers) {
  app.use(path, routers[path]);
}

/*
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
  });
}*/

app.listen("5000", () => console.log("Server running on port 5000"));
