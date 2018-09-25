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
    console.log(`\nConnection as id ${connection.threadId}\n`);
    menuOptions();
});

function menuOptions() {
    inquirer.prompt({
        name: `option`,
        type: `list`,
        message: `What would you like to do?`,
        choices: [`View Product Sales by Department`, `Create New Department`]
    }).then(mode => {
        if(mode.option === `View Product Sales by Department`) {
            viewProductSales();
        }
    })
};

function viewProductSales() {
    var dataQuery = `SELECT DISTINCT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales `;
        dataQuery += `FROM departments INNER JOIN products ON (departments.department_name = products.department_name) `;
        dataQuery += ` WHERE (departments.department_name = products.department_name) ORDER BY department_id ASC;`;
    var totalPriceQuery = `SELECT (products.product_sales - departments.over_head_costs) AS total_price`;
    connection.query(dataQuery, function(err, res) {
        if(err) throw err;
        console.log(res);
        console.log(`===========================`);
        var totalProfit = [];
        for (let i = 0; i < res.length; i++) {
            var difference = res[i].product_sales - res[i].over_head_costs;
            totalProfit.push(difference);
        }
        console.log(totalProfit);
    })
    connection.end();
}
