/*
1. Create a new MySQL table called `departments`. Your table should include the following columns:

* department_id

* department_name

* over_head_costs (A dummy number you set for each department)

2. Modify the products table so that there's a product_sales column, and modify your `bamazonCustomer.js` app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

* Make sure your app still updates the inventory listed in the `products` column.

3. Create another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:

* View Product Sales by Department

* Create New Department

4. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

| department_id | department_name | over_head_costs | product_sales | total_profit |
| ------------- | --------------- | --------------- | ------------- | ------------ |
| 01            | Electronics     | 10000           | 20000         | 10000        |
| 02            | Clothing        | 60000           | 100000        | 40000        |

5. The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. You should use a custom alias.

6. If you can't get the table to display properly after a few hours, then feel free to go back and just add `total_profit` to the `departments` table.
*/


var mysql = require("mysql");
var inquirer = require("inquirer");
var p_id = 0;
var qty = 0;
var db_qty=0;
// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "P@ssword",
  database: "bamazon"
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    supervisorView();

  });

/*
  Running this application will list a set of menu options:

* View Product Sales by Department

* Create New Department


*/  
function supervisorView(){
    inquirer
    .prompt({

        
          name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
              "View Products Sales by Department",
              "Create New Department",
              "Exit"
            ]

    })
    .then(function(choice){
        switch (choice.action) {
            case "View Products Sales by Department":
              viewSalesByDept();
              break;
      
            case "Create New Department":
              createNewDept();
              break;
            
            case "Exit":
                  connection.end();  
              break;
                
      
            default:
              console.log("Please chose proper choice:");
              managerView();
              break;
            }

    });

}

function viewSalesByDept(){

    var query = `select dept.department_id, dept.department_name, dept.over_head_costs, pd.product_sales, (pd.product_sales-dept.over_head_costs) as 'total_profit'
from bamazon.departments as dept 
INNER JOIN bamazon.products as pd ON
(dept.department_name = pd.department_name)  
where dept.department_name = pd.department_name
group by dept.department_id, dept.department_name`;
connection.query(query, function(err, res) {
    if(err) throw err;

    console.log(`| department_id | department_name | over_head_costs | product_sales | total_profit |`);
   for(var i=0;i<res.length;i++)
   {
    console.log(`|    ${res[i].department_id}     | ${res[i].department_name}|    ${res[i].over_head_costs}     | ${res[i].total_profit} |`);
   } 
   supervisorView(); 
});
}
 //INSERT INTO departments (department_name,over_head_costs)
//VALUES ("Jwellery",2500);
function createNewDept(){
    inquirer
    .prompt([{
        name: "department_name",
        type: "input",
        message: "Enter Name of New Department :"

    },{
        name: "over_head_costs",
        type: "input",
        message: "Enter over head cost of the department:"

    }])
    .then(function(choice){
      
        connection.query(
            "INSERT INTO departments SET ?",
            {
              department_name: choice.department_name ,
              over_head_costs:choice.over_head_costs ,
            },
            function(err, res) {
              if (err) throw err;
              console.log(res.affectedRows + " product inserted!\n");
              // Call supervisorView AFTER the INSERT completes
              supervisorView();  
            });
       

    });

}