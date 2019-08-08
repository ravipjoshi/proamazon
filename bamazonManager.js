/*

  * List a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.





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
    managerView();

  });
 
/*
 * List a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

*/
function managerView(){

    inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Exit"
      ]
    })
    .then(function(choice) {
      switch (choice.action) {
      case "View Products for Sale":
        viewSaleProducts();
        break;

      case "View Low Inventory":
        viewLowInventory();
        break;

      case "Add to Inventory":
        addNewInventory();
        break;

      case "Add New Product":
        addNewProduct();
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

//* If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.  
function viewSaleProducts(){

    connection.query("SELECT * FROM products", function(err, res) {
        if(err) throw err;

        console.log(`||===== ID =====||===== Product Name =====||===== Price =====||===== qty ===== ||`);
       for(var i=0;i<res.length;i++)
       {
        console.log(`||     ${res[i].item_id}     || ${res[i].product_name}||    ${res[i].price}     || ${res[i].stock_quantity} `);
       } 
       managerView(); 
    });

}  
// * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
function viewLowInventory(){
    connection.query(`SELECT * FROM products where stock_quantity < 5`, function(err, res) {
        if(err) throw err;

        console.log(`||===== ID =====||===== Product Name =====||===== Price =====||===== qty ===== ||`);
       for(var i=0;i<res.length;i++)
       {
        console.log(`||     ${res[i].item_id}     || ${res[i].product_name} ||   ${res[i].price}     || ${res[i].stock_quantity} `);
       }
       managerView();  
    });

}
// * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
function addNewInventory()
{
    inquirer
    .prompt([{
        name: "product_id",
        type: "input",
        message: "Enter the id of product you want to add :"

    },
    {
        name: "qty",
        type: "input",
        message: "Enter qty of the selected product you want to add :"

    }
    ])
    .then(function(choice){
        
        p_id = choice.product_id;
        console.log(choice.product_id);
        qty = choice.qty;
        console.log(choice.qty);
        productAvailability(p_id,qty);
        
    });
 
}
//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
function addNewProduct(){
        //product_name,product_description,department_name,price,stock_quantity
    inquirer
    .prompt([{
        name: "product_name",
        type: "input",
        message: "Enter Name of Product :"

    },{
        name: "product_description",
        type: "input",
        message: "Enter product description:"

    },
    {
        name: "department_name",
        type: "input",
        message: "Enter department Name :"

    },
    {
        name: "price",
        type: "input",
        message: "Enter price of product :"

    },
    {
        name: "stock_quantity",
        type: "input",
        message: "Enter Quantity of the product :"

    },
    
    ])
    .then(function(choice){
      
     connection.query(
            "INSERT INTO products SET ?",
            {
              product_name: choice.product_name ,
              product_description :choice.product_description ,
              department_name :choice.department_name,
              price: choice.price ,
              stock_quantity: choice.stock_quantity 
            },
            function(err, res) {
              if (err) throw err;
              console.log(res.affectedRows + " product inserted!\n");
              // Call updateProduct AFTER the INSERT completes
              managerView(); 
            });
       

    });

}

function productAvailability(id,qty)
{
    connection.query("SELECT stock_quantity FROM products where ?",{item_id:id}, function(err, res) {
        if(err) throw err;

       db_qty = res[0].stock_quantity; 
      
       console.log(`Available Quantity is: ${res[0].stock_quantity} `);
       console.log(`Requested Quantity: ${qty}`);
       
         
       if(db_qty>qty)
       {
           
           
           updateProduct(id,db_qty,qty);
         
       }
             
    });
    
}

 function updateProduct(id,ava_qty,req_qty)
 {
    qty = parseFloat(ava_qty)+parseFloat(req_qty); 
    connection.query(`UPDATE products SET stock_quantity=${qty} where ?`,{item_id:id}, function(err, res) {
        if(err) throw err;

        console.log(`Number of record updated are:${res.affectedRows}`);
        managerView();
    });

    

    
 }

 