require("dotenv").config({ path: "../.env" });
import time from "./options/time";

if (!process.env.db) {
  console.error("Please provide a MongoDB connection string in .env.");
  process.exit();
}

import mongoose from "mongoose";
mongoose
  .connect(process.env.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(console.error);

import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "What method would you like to use? (time/manual)\n",
  async (l: string) => {
    l = l.toLowerCase();
    if (l == "time") {
      rl.close();
      return time();
    }

    console.log("Hey, that's not a valid option!");
    return process.exit();
  }
);
