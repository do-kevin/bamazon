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
    connection.end();
});

function start() {
    var data = `SELECT * FROM products`;
    connection.query(data, function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(`
Item ID: ${res[i].item_id}
Product: ${res[i].product_name}
Department: ${res[i].department_name}
Price: $${res[i].price}
Stock: ${res[i].stock_quantity}
            `);
        }

        inquirer.prompt({
            name: `askItemId`,
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
            console.log(selected.askItemId);


            // Finds the selected product's place in the array
            j = Number(selected.askItemId - 1);
            console.log(typeof j);
            
            console.log(res[j]);

        })
    })

}