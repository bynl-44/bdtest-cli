const chalk = require("chalk");

const red = chalk.red;
const green = chalk.green;
const greenBold = chalk.green.bold;

module.exports = {
  error: message => {
    console.error(red(message));
  },
  info: message => {
    console.log(greenBold(message));
  },
  success: message => {
    console.log(green(message));
  }
};
