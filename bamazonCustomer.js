var mysql = require("mysql");
var inquirer = require("inquirer");

require("dotenv").config();

var connection = mysql.createConnection({
host: "localhost",
port: 3306,
user: "root",
password: "B00tcamp",
database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err
    displayInventory()
});

var displayInventory = () => {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            console.log(" - - - - - - - - - - - - - - - ")
            console.log("Item Number: " + res[i].item_id)
            console.log("Product: " + res[i].product_name)
            console.log("Price: $" + res[i].price)
            console.log("Quantity In Stock: " +res[i].stock_quantity )
        }
        purchase()
    })
};

var validateInput = (value) => {
    var integer = Number.isInteger(parseFloat(value))
    var sign = Math.sign(value)

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole non-zero number.'
    }
}

var purchase = () => {
    inquirer.prompt([{
                type: "input",
                name: "item_id",
                message: "Select item you would like to purchase by item number.",
                validate: validateInput,
                filter: Number
            },
            {
                type: "input",
                name: "quantity",
                message: "How many would you like to purchase?",
                validate: validateInput,
                filter: Number
            }
        ])
        .then(function(purchase) {
            var item = purchase.item_id
            var quantity = purchase.quantity

            var queryStr = 'SELECT * FROM products WHERE ?';

            connection.query(queryStr, { item_id: item }, function(err, res) {
                if (err) throw err

                if (res.length === 0) {
                    console.log("ERROR: Invalid Item ID. Please select a valid Item ID.")
                    displayInventory()
                } else {

                    var productInfo = res[0]

                    if (quantity <= productInfo.stock_quantity) {
                        console.log(productInfo.product_name + "is in stock! Placing order now.....")
                        console.log("\n")

                        var updateQueryStr = "UPDATE products SET stock_quantity = " + (productInfo.stock_quantity - quantity) + " WHERE item_id = " + item

                        connection.query(updateQueryStr, function(err, data) {
                            if (err) throw err;

                            console.log("Your order has been placed!");
                            console.log("Your total is $" + productInfo.price * quantity)
                            console.log("Thank you for shopping with Bamazon!")
                            console.log(" - - - - - - - - - - - - - - - ")
                            console.log("To shop again, please input 'node bamazonCustomer.js' in your command line again.")
                            console.log("\n")

                            connection.end();
                        })
                    } else {
                        console.log("Sorry, we do not have " + productInfo.product_name + " in stock.")
                        console.log("Your order can not be placed at this time.")
                        console.log("Please change your order or select another item.")
                        console.log("\n")

                        setTimeout(function() { displayInventory() }, 5000)
                    }


                }
            })


        })
}