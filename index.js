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
    displayProducts();

  });
 

function displayProducts(){
    connection.query("SELECT * FROM products", function(err, res) {
        if(err) throw err;

        console.log(`||===== ID =====||===== Product Name =====||===== Product Description =====||===== Department Name =====||===== Price =====      `);
       for(var i=0;i<res.length;i++)
       {
        console.log(`||     ${res[i].item_id}     || ${res[i].product_name} || ${res[i].product_description} ||    ${res[i].department_name}     || ${res[i].price} `);
       }  
    });

    selectProductToBuy();
   

  } 

function selectProductToBuy (){

    inquirer
    .prompt([{
        name: "product_id",
        type: "input",
        message: "Enter the id of product you want to buy:"

    },  
    {
        name: "qty",
        type: "input",
        message: "Enter the number of quantity of above selected product:"
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

function productAvailability(id,qty)
{
    connection.query("SELECT stock_quantity, product_sales, price  FROM products where ?",{item_id:id}, function(err, res) {
        if(err) throw err;

       db_qty = res[0].stock_quantity;
       db_sales = res[0].product_sales; 
       price = res [0].price;
       console.log(`Available Quantity is: ${res[0].stock_quantity} `);
       console.log(`Requested Quantity: ${qty}`);
       console.log(`Total sales is : ${db_sales}`);
         
       if(db_qty>qty)
       {
           console.log("WE HAVE RECEIVED A REQUEST FOR YOUR ORDER. WE CAN FULFILL YOUR REQUEST WITHIN 24 HOURS");
           
           
           updateProduct(id,db_qty,qty,db_sales,price);
         
       }
       else
       {
          console.log("WE HAVE RECEIVED A REQUEST FOR YOUR ORDER. WE ARE EXTREMLY SORRY FOR THE INCONVINIENCE WE CAN NOT FULL FILL YOUR REQUEST");
       }
       
    });
    
}

 function updateProduct(id,ava_qty,req_qty,sales,price)
 {
    qty = ava_qty-req_qty;
    var total = parseFloat(qty)*parseFloat(price);
    var new_sales = parseFloat(sales) + parseFloat(total); 
    connection.query(`UPDATE products SET stock_quantity=${qty}, product_sales=${new_sales} where ?`,{item_id:id}, function(err, res) {
        if(err) throw err;

        console.log(`Number of record updated are:${res.affectedRows}`);
        confirmOrder(id,req_qty,total);
    });

    

    
 }

 function confirmOrder(id,qty,total)
 {
     //console.log("Display order function is called");
     inquirer
     .prompt({
        name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
              "Checkout - Print Invoice",
              "Cancel Order",
              "Exit"
            ]
     })
     .then(function(choice){
        switch (choice.) {
            case "Checkout - Print Invoice":
              displayOrder(id,qty,total);
              break;
      
            case "Cancel Order":
              cancelOrder();
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
function displayOrder(id,qty,total){

    connection.query(`SELECT product_name,price from products where ?`,{item_id:id},function(err,res){
        if(err) throw err;

        console.log(`Hello User,\n Thank you for Purchasing ${res[0].product_name} from Our shop`);
        console.log(`Product Quanitiy is : ${qty}`);
            
        
        console.log(`Total Purchase of your order is : ${total} `);
       displayProducts();
    });   

}

function cancelOrder(){

     console.log("Your order has been cancelled. Do visit us again !");
}
  