const mysql = require("mysql");

const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
    insecureAuth: true,
  
    password: "brooklyn25",
    database: "bamazon"
  });

  connection.connect(function(err){
    if (err) throw err
    
    loadProducts()
})


const loadProducts = () => {
    connection.query("SELECT * FROM products", (err, res) => {
      
    console.table(res)
    prompCustomerforItem(res)
    })
}

const prompCustomerforItem = inventory => {
    inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What is the ID of the item you would you like to purchase? [Quit with Q]",
        validate: val => !isNaN(val) || val.toLowerCase() === "q"
        
      }
    ])
    .then(val => {
      checkIfShouldExit(val.choice);
      const choiceId = parseInt(val.choice);
      const product = checkInventory(choiceId, inventory);

      if (product) {
        promptCustomerForQuantity(product);
      }
      else {
        console.log("\nThat item is not in the inventory.");
        loadProducts();
      }
    });

}

const checkIfShouldExit = choice => {
    if (choice.toLowerCase() === "q"){
        console.log('Dont let the screen hit you.')
        process.exit(0);
    }
}
 const checkInventory = (choiceId, inventory) => {
    
    const item = inventory.filter(item => item.id === choiceId);
    return item.length > 0 ? item[0] : null;
}
const makePurchase = (product, quantity) => {
    console.log(product)
    connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?",
        [quantity, product.id],
        function(err, res) {
          console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
          loadProducts();
        }
      );
}
const promptCustomerForQuantity = product => {
    inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like? [Quit with Q]",
        validate: val => val > 0 || val.toLowerCase() === "q"
        }
      
    ])
    .then(val => {
      checkIfShouldExit(val.quantity);
      const quantity = parseInt(val.quantity);

      if (quantity > product.stock_quantity) {
        console.log("\nInsufficient quantity!");
        loadProducts();
      }
      else {
        makePurchase(product, quantity);
      }
    });
}






  
//   connection.connect(function(err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId); 
//     loadProducts()
//     connection.end();
//   });

// const loadProducts = () => {
//     connection.query("SELECT * FROM products", (err, res) => {
//         if (err) { throw err;
//         }
//     console.table(res)
//     })

//     connection.query("SELECT * FROM products", function(err, res) {
//         if (err) throw err;
//         console.log("ITEMS FOR SALE");
//         for (var i = 0; i < res[i].length; i++) {
//             const quantity = res[i].stock_quantity;
//             const prodId = res[i].item_id;
//             const prodName = res[i].product_name;
//             const price = res[i].price;
//             (
//                 [prodId, prodName, price]
//             );
//         }
//         console.log(loadProducts.toString());
//         buyProduct();
//     });
// }

// function buyProduct() {
//     inquirer.prompt([{
//         name: "product_id",
//         message: "Enter the ID of the product you'd like to buy."
//     }, {
//         name: "quantity",
//         message: "How many of the product you selected would you like to buy?"
//     }]).then(function(answers) {
//         connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", [answers.product_id], function(err, res) {
//             console.log(res);

//             if (answers.quantity > res[0].stock_quantity) {
//                 console.log("Insufficient quantity!");
//                 buyProduct();
//             } else {
//                 const newQty = res[0].stock_quantity - answers.quantity;
//                 connection.query("SELECT * FROM products WHERE item_id = ?", [answers.product_id], function(err, res) {
//                     const prodSelected = res[0].product_name;
//                     const price = res[0].price;
                    
//                     const total = parseFloat(price * answers.quantity);
                  
//                     connection.query("UPDATE products SET ? WHERE ?", [{
//                         stock_quantity: newQty,
//                     }, {
//                         item_id: answers.product_id
//                     }], function(err) {
//                         if (err) throw err;
//                         console.log("\nSuccess, you've purchased " + answers.quantity + " of " + prodSelected + " for the price of $" + total + ".\n");
//                         initialize();
//                     });
//                 });
//             }
//         });
//     });
// }

  