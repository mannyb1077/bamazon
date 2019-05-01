var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

var connection = mysql.createConnection({
host: "localhost",
port: 3306,
user: "root",
password: process.env.ROOT_PASSWORD,
database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    
    var query = connection.query(
        "SELECT * FROM products",
        customerSelection()
    )
    
});//End of Connection

function customerSelection(err, data) {
    for (var i = 0; i < data.length; i++){
        console.log("Product ID: " + data[i] + "Product Name: " + data[i].name + "Product Price " + data[i].price)
    }
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
    .then (function(input){
        
        var query = connection.query
        "SELECT * FROM products WHERE ?",{
            id: item
        }
        stock()
    })

};

function stock(err, data){
    var item = input.itemId;
    var quantity = input.quantity;
    var stock = data[0].stock;
    var sales = data[0].sales;

    if (quantity > data[0].stock){
        console.log("Sorry, Product is out of Stock. Please check back in 30 days")
        connection.end();
    }  
    else{ 
        var query = connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock: stock - quantity,
                    sales: sales + (data[0].price * quantity)
                },
                {
                    id: item
                }
            ],

            function orderPlaced(err, data)
        )
    }
}

function orderPlaced(err,data){
    console.log("Congratulations, order has been placed");
    connection.end();
}