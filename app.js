const axios = require("axios");
const querystring = require("querystring");
const getWords = async() => {
    try {
        return await axios.get(
            "https://gist.githubusercontent.com/atduskgreg/3cf8ef48cb0d29cf151bedad81553a54/raw/82f142562cf50b0f6fb8010f890b2f934093553e/animals.txt"
        );
    } catch (error) {
        console.error(error);
    }
};

const countWords = async() => {
    const words = await getWords();
    const wordsList = words.data.split("\n");
    return wordsList;
};

const entireList = countWords();

const express = require("express");
const app = express();
// get put post delete
const port = 4444;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

app.get("/", (req, res) => {
    res.send("HI go to /animals to see all the animal list! :))");
});
app.get("/animals", (req, res) => {
    let userInput = req.query["q"];
    if (userInput !== undefined) {
        userInput = userInput.toLowerCase();
        entireList.then((result) => {
            let lowerCaseList = result.map((v) => v.toLowerCase());
            let resultList = [];
            lowerCaseList.forEach((elem) => {
                if (elem.includes(userInput)) {
                    // console.log(elem);
                    resultList.push(capitalizeFirstLetter(elem));
                }
            });

            res.send(resultList);
        });
    } else {
        entireList.then((result) => {
            res.send(result);
        });
    }
});

app.listen(port, () => console.log("listening"));