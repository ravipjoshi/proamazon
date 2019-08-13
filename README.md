# proamazon

The app will take in orders from customers and deplete stock from the store's inventory. 
App can track product sales across the store's departments and then provide a summary of the highest-grossing departments in the store.


### Before You Begin

# Perform following steps:

1.  Clone the repository

2.  Run npm install, and the following packages should be installed:

      mysql

      inquirer

3.  Create a .env file in the same directory as the rest of the files. In the .env file should be:
      '# Database Credentials'

      'HOST= your-database-host' e.g. localhost or IP 
      
      'PORT= your-port-where-databse-server-is-runnin' e.g. 3306 
      
      'UNAME= your-databse-username'
      
      'PASSWORD= your-password-to-access-database'
      
      'DATABASE= name-of-your-database'
      
4.  Run the file proamazone.sql in your database to get up-to-date data in your database       

### liri Available functions:

# If you run proamazonCustmer.js file with command node proamazonCustmer.js :

  * Populate the Items avaialble for sale. Include the ids, name and prcices of products for sale.

  * The app should then prompt following two messages.

   1. The first should ask them the ID of the product they would like to buy.
   2. The second message should ask how many units of the product they would like to buy.

  *  Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

  * However, if your store _does_ have enough of the product, you should fulfill the customer's order.
  
   * This means updating the SQL database to reflect the remaining quantity.
  
   * Once the update goes through, show the customer the total cost of their purchase.

- - -

* Working Demo
    ![challange-1](assets\challenge1.gif)

- - -

# If you run proamazonManager.js file with command node proamazonManger.js :

* it will prompt following menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

  * If  user selects `View Products for Sale`, the it will list every available item: the item IDs, names, prices, and quantities.
        * Working Demo
                  ![challenge-2.1](assets\challenge2.1.gif)


  * If  user selects `View Low Inventory`, then it will list all items with an inventory count lower than five
        * Working Demo
                  ![challenge-2.2](assets\challenge2.2.gif)
          
  * If  manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
        * Working Demo
                  ![challenge-2.3](assets\challenge2.3.gif)
      
  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
        * Working Demo
                  ![challenge-2.4](..\assets\challenge2.3.gif)
          
# If you run proamazonManager.js file with command node proamazonManger.js :

* it will prompt following menu options:

   * View Product Sales by Department
   
   * Create New Department

4. When user selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.
  * Working Demo
                  ![challenge-3.1](assets\challenge3.1.gif)


5. When user selects create

  * Working Demo
                  ![challenge-3.2](assets\challenge3.2.gif)

