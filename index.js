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
   // productAvailability(p_id,qty);
}

function productAvailability(id,qty)
{
    connection.query("SELECT stock_quantity FROM products where ?",{item_id:id}, function(err, res) {
        if(err) throw err;

       db_qty = res[0].stock_quantity; 
       console.log(`Available Quantity is: ${res[0].stock_quantity} `);

       if(db_qty<qty)
       {
           console.log("WE HAVE RECEIVED A REQUEST FOR YOUR ORDER. WE CAN FULFILL YOUR REQUEST WITHIN 24 HOURS");
       }
       else
       {
          console.log("WE HAVE RECEIVED A REQUEST FOR YOUR ORDER. WE ARE EXTREMLY SORRY FOR THE INCONVINIENCE WE CAN NOT FULL FILL YOUR REQUEST");
       }
       
    });
    
}



//   function runSearch() {
//     inquirer
//       .prompt({
//         name: "action",
//         type: "rawlist",
//         message: "What would you like to do?",
//         choices: [
//           "Find songs by artist",
//           "Find all artists who appear more than once",
//           "Find data within a specific range",
//           "Search for a specific song",
//           "Find artists with a top song and top album in the same year"
//         ]
//       })
//       .then(function(answer) {
//         switch (answer.action) {
//         case "Find songs by artist":
//           artistSearch();
//           break;
  
//         case "Find all artists who appear more than once":
//           multiSearch();
//           break;
  
//         case "Find data within a specific range":
//           rangeSearch();
//           break;
  
//         case "Search for a specific song":
//           songSearch();
//           break;
  
//         case "Find artists with a top song and top album in the same year":
//           songAndAlbumSearch();
//           break;
//         }
//       });
//   }

 
  
//   function artistSearch() {
//     inquirer
//       .prompt({
//         name: "artist",
//         type: "input",
//         message: "What artist would you like to search for?"
//       })
//       .then(function(answer) {
//         var query = "SELECT position, song, year FROM top5000 WHERE ?";
//         connection.query(query, { artist: answer.artist }, function(err, res) {
//           for (var i = 0; i < res.length; i++) {
//             console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
//           }
//           runSearch();
//         });
//       });
//   }
  
//   function multiSearch() {
//     var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
//     connection.query(query, function(err, res) {
//       for (var i = 0; i < res.length; i++) {
//         console.log(res[i].artist);
//       }
//       runSearch();
//     });
//   }
  
//   function rangeSearch() {
//     inquirer
//       .prompt([
//         {
//           name: "start",
//           type: "input",
//           message: "Enter starting position: ",
//           validate: function(value) {
//             if (isNaN(value) === false) {
//               return true;
//             }
//             return false;
//           }
//         },
//         {
//           name: "end",
//           type: "input",
//           message: "Enter ending position: ",
//           validate: function(value) {
//             if (isNaN(value) === false) {
//               return true;
//             }
//             return false;
//           }
//         }
//       ])
//       .then(function(answer) {
//         var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//         connection.query(query, [answer.start, answer.end], function(err, res) {
//           for (var i = 0; i < res.length; i++) {
//             console.log(
//               "Position: " +
//                 res[i].position +
//                 " || Song: " +
//                 res[i].song +
//                 " || Artist: " +
//                 res[i].artist +
//                 " || Year: " +
//                 res[i].year
//             );
//           }
//           runSearch();
//         });
//       });
//   }
  
//   function songSearch() {
//     inquirer
//       .prompt({
//         name: "song",
//         type: "input",
//         message: "What song would you like to look for?"
//       })
//       .then(function(answer) {
//         console.log(answer.song);
//         connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
//           console.log(
//             "Position: " +
//               res[0].position +
//               " || Song: " +
//               res[0].song +
//               " || Artist: " +
//               res[0].artist +
//               " || Year: " +
//               res[0].year
//           );
//           runSearch();
//         });
//       });
//   }
  
//   function songAndAlbumSearch() {
//     inquirer
//       .prompt({
//         name: "artist",
//         type: "input",
//         message: "What artist would you like to search for?"
//       })
//       .then(function(answer) {
//         var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
//         query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
//         query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";
  
//         connection.query(query, [answer.artist, answer.artist], function(err, res) {
//           console.log(res.length + " matches found!");
//           for (var i = 0; i < res.length; i++) {
//             console.log(
//               i+1 + ".) " +
//                 "Year: " +
//                 res[i].year +
//                 " Album Position: " +
//                 res[i].position +
//                 " || Artist: " +
//                 res[i].artist +
//                 " || Song: " +
//                 res[i].song +
//                 " || Album: " +
//                 res[i].album
//             );
//           }
  
//           runSearch();
//         });
//       });
//   }
  