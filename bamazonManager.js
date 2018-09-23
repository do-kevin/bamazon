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
Price: $${show.price}
Stock: ${show.stock_quantity}
            `);
        })
    });
    connection.end();
}