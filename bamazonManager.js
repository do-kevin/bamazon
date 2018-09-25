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
    menuOptions();
});

function menuOptions() {
    inquirer.prompt({
        name: `option`,
        type: `list`,
        message: `What do you want to do?`,
        choices: [`View Products for Sale`, `View Low Inventory`, `Add to Inventory`, `Add New Product`]
    }).then(function(mode) {
        console.log(mode.option);
        if(mode.option === `View Products for Sale`) {
            productsForSale();
        } else if(mode.option === `View Low Inventory`) {
            lowInventory();
        } else if(mode.option === `Add to Inventory`) {
            addInventory();
        } else if(mode.option === `Add New Product`) {
            newProduct();
        }
    });
}

function productsForSale() {
    var data = `SELECT * FROM products`;
    connection.query(data, function(err, res) {
        if (err) throw err;
        res.forEach(function (show) {
            console.log(`
Item ID: ${show.item_id}
Product: ${show.product_name}
Price, USD: ${show.price}
Stock: ${show.stock_quantity}
            `);
        })
    });
    connection.end();
}

function lowInventory() {
    var data = `SELECT * FROM products WHERE stock_quantity < 5`
    connection.query(data, function(err, res) {
        if (err) throw err;
        res.forEach(function (show) {
            console.log(`
Department: ${show.department_name}
Item ID: ${show.item_id}
Product: ${show.product_name}
Stock: ${show.stock_quantity}
            `);
        })
    })
    connection.end();
}

function addInventory() {
    var data = `SELECT * FROM products`;
    connection.query(data, function(err,res) {
        if(err) throw err;
        inquirer.prompt({
            name: `itemId`,
            type: `list`,
            message: `To add more of the item, select its corresponding ID number:`,
            choices: function() {
                var itemIdArray = [];
                for (let i = 0; i < res.length; i++) {
                    itemIdArray.push(`${res[i].item_id}`);
                }
                return itemIdArray;
            }
        }).then((selected) => {
            j = Number(selected.itemId - 1);
            var k = res[j];
            inquirer.prompt({
                name: `amount`,
                type: `input`,
                message: `How much would you like to add to the stock of \"${k.product_name}\", which currently has ${k.stock_quantity} units?`
            }).then((add) => {
                if (add.amount === "" || isNaN(add.amount) || add.amount % 1 !== 0 ) {
                    console.log(`You did not input an integer number. Please run \'node bamazonManager.js\' again`);
                } else {
                    var newQuantity = Number(add.amount) + k.stock_quantity;
                    var updateData = `UPDATE products SET stock_quantity = ${newQuantity} where item_id = ${k.item_id};`;
                    connection.query(updateData, function() {
                        console.log(`There are now ${newQuantity} units of \'${k.product_name}\' in stock.`)
                    });
                }
                connection.end();
            });
        });
    })
}

function newProduct() {
    inquirer.prompt([
        {
            name: `productName`,
            type: `input`,
            message: `What is the name of the product that you want insert into the database?`
        },
        {
            name: `departmentName`,
            type: `list`,
            messages: `From which department is this product sold from?`,
            choices: [`Books & Audible`, `Movies, Music & Games`, `Electronics, Computers & Office`, `Home, Garden, Pets & Tools`, `Food & Grocery`, `Beauty & Health`, `Toys, Kids & Baby`, `Clothing, Shoes & Jewelry`, `Handmade`, `Sports & Outdoors`, `Automotive & Industrial`]
        },
        {
            name: `price`,
            type: `input`,
            message: `How much will this product cost?`,
            validate: function(value) {
                var pass = value.match(/^(?!^0\.00$)(([1-9][\d]{0,6})|([0]))\.[\d]{2}$/);
                if(pass) {
                    return true;
                }
                return `Excluding $, please enter a valid price.`;
            }
        },
        {
            name: `stockQuantity`,
            type: `input`,
            message: `Enter the product's unit amount:`,
            validate: function(value) {
                var pass = value.match(/^\+?(0|[1-9]\d*)$/);
                if(pass) {
                    return true;
                }
                return `Enter the amount as a valid integer`;
            }
        }
    ]).then(function(newItem) {
        var updateData = `INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES ("${newItem.productName}", "${newItem.departmentName}", ${newItem.price}, ${newItem.stockQuantity}, 0)`
        connection.query(updateData, function() {
            console.log(`
Product Name: ${newItem.productName}
Department: ${newItem.departmentName}
Price, USD: ${newItem.price}
Stock Quantity: ${newItem.stockQuantity}
            `);
        });
        connection.end();
    });
}