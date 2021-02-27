require("dotenv").config({ path: "../.env" });

if (!process.env.db) {
  console.error("Please provide a MongoDB connection string in .env.");
  process.exit();
}

import sh from "../db/car";

import ms from "ms";

import ora from "ora";
import readline from "readline";

const time = async function () {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("What's your license plate?\n", async (l: string) => {
    let license: string = l;
    rl.question("How long will you be parking for?\n", async (l: string) => {
      let time: string | number = ms(l);

      const spinner = ora();
      spinner.color = "green";

      if (!time) {
        console.log("Please enter a valid time (s/m/d/h)");
        process.exit();
      }

      spinner.start("Succeeded! Loading...");

      const alsoSpinner = ora();
      alsoSpinner.color = "yellow";

      time = time.toString();

      const nd = new sh({
        licensePlate: license,
        time: time,
      });

      try {
        await nd.save().then(async (data) => {
          spinner.succeed("Successfully saved to the database!");
          const hRT: string = ms(Number(time), { long: true });
          alsoSpinner.start(`You are currently parking for ${hRT}...`);
          setTimeout(async () => {
            await data.delete();
            alsoSpinner.succeed("Thanks for your stay. Opening gates...");
            process.exit();
          }, Number(time) + 3000);
          rl.close();
          // process.exit();
        });
      } catch (e) {
        // @ts-ignore
        spinner.fail(
          "There was an error saving to the database. Please try again."
        );
      }
    });
  });
};

export default time;
