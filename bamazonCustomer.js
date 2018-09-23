const mysql = require(`mysql`);

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
    var display = `SELECT * FROM products;`;
    connection.query(display, function (err, res) {
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
    });
}