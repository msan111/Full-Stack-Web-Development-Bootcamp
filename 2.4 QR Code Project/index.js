/* 
1. Use the inquirer npm package to get user input. (get an url)
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/


import inquirer from "inquirer";
import fs from "fs";
import qr from "qr-image";


inquirer
  .prompt([
    {
        name: "url",
        message: "Please enter the URL you would like to convert to a QR code:",
    }
  ])
  .then((answers) => {
    const url = answers.url;
    const qr_png = qr.image(url);
    //const qr_png = qr.image(url, { type: "png" });
    qr_png.pipe(fs.createWriteStream("qr_img.png"));
    fs.writeFile("qr_url.txt", url, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("The URL has been saved to qr_url.txt");
      }
    });


  })
  .catch((error) => {
    if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment");
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });



