const input = process.argv.slice(2);
const fs = require('fs');
const needle = require('needle');
// const readline = require("readline");
// // const rl = readline.createInterface({
// //   input: process.stdin,
// //   output: process.stdout,
// // });

const pageFetcher = function(url, filePath) {
  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.log(`Cannot access file path, please check that the path ${filePath} is correct and try again.`);
      return;
    }
    // else if (stats.size > 0) {
    //   rl.question("File already contains data, do you wish to overwrite it? (Y/N) ", (overwriteCheck) => {
    //     if (overwriteCheck.toLowerCase() !== "y") {
    //       console.log(`Did not overwrite ${filePath}, exiting session...`);
    //     }
    //     rl.close();
    //     return;
    //   });
    // }
    needle.get(url, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        console.log(`URL not reachable please ensure ${url} is correct and try again.`);
        return;
      }
      fs.writeFile(filePath, body, err => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
        }
      });
    });
  });
};


pageFetcher(input[0],input[1]);