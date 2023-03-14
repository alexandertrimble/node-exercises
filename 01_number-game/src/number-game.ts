import * as readline from "readline";

const maxGuesses = 3;

export const play = async () => {
  let gameOver = false;

  const target = Math.floor(Math.random() * 10) + 1;
  console.log("Guess a number between 1 and 10");
  let currentGuessCount = 0;

  while (!gameOver) {
    const guess = await new Promise((resolve, reject) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(
        `Guess (${currentGuessCount + 1}/${maxGuesses}): `,
        (answer) => {
          rl.close();
          resolve(answer);
        }
      );
    });

    if (guess === target.toString()) {
      console.log("You win!");
      gameOver = true;
    } else {
      console.log(`Nope, try again.`);
      currentGuessCount++;
    }

    if (currentGuessCount >= maxGuesses) {
      console.log("You lose! The number was " + target + ".");
      gameOver = true;
    }
  }

  //play again
  const playAgain = await new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(`Play again? (y/n): `, (answer) => {
      rl.close();
      resolve(answer);
    });
  });

  if (playAgain === "y") {
    play();
  } else {
    console.error("Then fuck off");
    process.exit(0);
  }
};
