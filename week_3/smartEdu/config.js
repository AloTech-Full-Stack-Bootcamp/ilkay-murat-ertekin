const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");

const config = () => {
  app = express();
  dotenv.config();
  mongoose
    .connect(process.env.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB CONNECTED!");
    })
    .catch((err) => {
      console.log(err);
    });

  // Middleware
  app.use(
    cors({
      origin: "*",
      allowedHeaders: ["sessionId", "Content-Type"],
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: process.env.mongoSecret,
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({ mongoUrl: process.env.mongoUrl }),
      cookie: {
        expires: new Date(Date.now() + 1200 * 1000),
      },
    })
  );
};
module.exports = config;
