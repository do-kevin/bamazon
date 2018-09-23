const mysql = require(`mysql`);
const inquirer = require(`inquirer`);

var connection = mysql.createConnection({
    host: `localhost`,
    port: 3306,
    user: `root`,
    password: '',
    database: `bamazon`
});

connection.connect(err => {
    if (err) throw err;
    console.log(`\nConnected as id ${connection.threadId}\n`);
    start();
});

function start() {
    var data = `SELECT * FROM products`;
    connection.query(data, function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(`
Item ID: ${res[i].item_id}
Product: ${res[i].product_name}
Price: $${res[i].price}
            `);
        }

        inquirer.prompt({
            name: `ItemId`,
            type: `list`,
            message: `Select the ID number of the item you would like to purchase:`,
            choices: function () {
                var itemIdArray = [];
                for (let i = 0; i < res.length; i++) {
                    itemIdArray.push(`${res[i].item_id}`);
                }
                return itemIdArray;
            }
        }).then(function(selected) {
            // Finds the selected product's place in the array
            j = Number(selected.ItemId - 1);
            var k = res[j];
            buyUnitsOf(k);

        });
    });
};

function buyUnitsOf(k) {
    inquirer.prompt({
        name: `amount`,
        type: `input`,
        message: `Price per unit: $${k.price}\n  Type & enter the amount of units you would to buy from this product`
    }).then(function(buy) {
        if (buy.amount > k.stock_quantity) {
            console.log(`Insufficient quantity!`);
        } else if (buy.amount === "" || isNaN(buy.amount)) {
            console.log(`You did not input a number. Please run \'node bamazonCustomer.js\' again`);
        } else if(buy.amount <= k.stock_quantity) {
            var stockLeft = k.stock_quantity -= buy.amount;
            var updateData = `UPDATE products SET stock_quantity = ${stockLeft} WHERE item_id = ${k.item_id};`;
            connection.query(updateData, function() {
                var totalCost = (buy.amount * k.price).toFixed(2);
                console.log(`You purchased ${buy.amount} unit(s) of \"${k.product_name},\" which now has ${k.stock_quantity} units left, from ${k.department_name}.\nTotal cost: $${totalCost}`);
            });
        }
        connection.end();
    });
};