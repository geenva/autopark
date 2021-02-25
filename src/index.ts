import sh from "./db/car";

import ms from "ms";

import ora from "ora";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What's your license plate?\n", async (l: string) => {
  let license: string = l;
  rl.question("How long will you be parking for?\n", async (l: string) => {
    let time: string | number = ms(l);

    if (!time) {
      console.log("Please enter a valid time (m/d/h)");
      process.exit();
    }

    const spinner = ora("Succeeded! Loading...").start();
    spinner.color = "green";

    time = time.toString();

    const nd = new sh({
      licensePlate: license,
      time: time,
    });

    try {
      await nd.save();
      spinner.succeed("Successfully saved to the database!");
    } catch (e) {
      // @ts-ignore
      spinner.fail(
        "There was an error saving to the database. Please try again."
      );
    }
  });
});
