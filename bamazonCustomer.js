var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
host: "localhost",
port: 3306,
user: "root",
password: "",
database: "bamazon."
});

connection.connect(function(err) {
if (err) throw err;
runSearch();
});

function runSearch() {
    inquirer.prompt([
        {
            name: "itemId",
            type: "input",
            message: "What Item ID would you like to purchase?",
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase"
        }
    ])
    .then(function(input) {
        var item = input.itemId;
        var quantity = input.quantity;
        // switch (answer.action) {
        // case "Find songs by artist":
        // artistSearch();
        // break;
        // case "Find all artists who appear more than once":
        // multiSearch();
        // break;
        // case "Find data within a specific range":
        // rangeSearch();
        // break;
        // case "Search for a specific song":
        // songSearch();
        // break;
        // case "Find artists with a top song and top album in the same year":
        // songAndAlbumSearch();
        // break;
    })
};
