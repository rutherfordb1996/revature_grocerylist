// Import the readline module for handling user input in the console
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin, // Read from standard input (keyboard)
  output: process.stdout // Write to standard output (console)
});
let grocerylist = [];
baseCase();


// this is the base layer, the code will loop back to this until the user decids to quit.
function baseCase(){
    console.log("your current grocery list is:\n")
    for(let i = 0; i < grocerylist.length; i++){
        console.log(`item: ${grocerylist[i].name} quantity: ${grocerylist[i].quantity}\n price: ${grocerylist[i].price} bought?: ${grocerylist[i].bought} \n`)
    }
    rl.question("would you like to 1: add an item, 2: remove an item, 3: toggle bought status of an item, or 4: quit? \n", (userInput) => {
    switch(userInput.trim()){
        case "1":
            createItem();
            break;
        case "2":
            userInitiatedRemoval();
            break;
        case "3":
            userInitiatedToggle();
            break;
        case "4":
            rl.close();
            break;
        default:
            console.log("unrecognized input, please enter only 1 2 3 or 4\n");
            baseCase();
        }
    })
}
// used to construct the item objects to store in the grocerylist array
function shoppingListItem(name, quantity, price, bought){
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.bought = bought;
}
function addItemToList(item){
    grocerylist.push(item);
}
//query user for input to create their shopping list item, always assumes the new item is unbought
//(why would you add something you don't need to the list?)
function createItem(){
    let item;
    let quantity;
    let price;

    rl.setPrompt("What item would you like to add? \n");
    rl.prompt();
    rl.once('line', (line) =>{
        item = line.trim();
        console.log(`Adding ${ line } to the list \n`);
        rl.setPrompt("How many do you need? \n");
        rl.prompt();
        rl.once('line', (line) =>{
            quantity = line.trim();
            console.log(`Setting quantity needed to ${ line } \n`);
            rl.setPrompt("How much do they cost? \n");
            rl.prompt();
                rl.once('line', (line) =>{
                    price = line.trim()
                    console.log(`Setting price to ${ line } \n`);
                    addItemToList( new shoppingListItem(item,quantity,price,false));
                    baseCase();
            })
        })
    })
}
//checks that an item for a given name does actually exist
function findItemByName(name){
    for(let i = 0; i < grocerylist.length; i++){
        if(grocerylist[i].name === name){
            return true;
        }
    }
}
//removes the first instance of an item with a given name
function removeItemByName(name){
    for(let i = 0; i < grocerylist.length; i++){
        if(grocerylist[i].name === name){
            grocerylist.splice(i,1);
        }
    }
}
//toggles whether the first instance of an item in the list has been bought
function toggleItemByName(name, bool){
    for(let i = 0; i < grocerylist.length; i++){
        if(grocerylist[i].name === name){
            grocerylist[i].bought = bool;
        }
    }
}
//gets user input and removes the matching item
function userInitiatedRemoval(){
    let name;
    rl.setPrompt("What is the name of the item you want to remove? \n");
    rl.prompt();
    rl.once('line', (line) =>{
        name = line.trim();
        if(findItemByName(name)){
            console.log(`removing ${ name } from the list! \n`);
            removeItemByName(name);
            baseCase();
        }
        else{
            console.log("Sorry, that item doesn't seem to exist, please try again\n");
            baseCase();
        }
    });
}
// gets user input and sets the item's bought value to either true or false
function userInitiatedToggle(){
    let name;
    let bool;
    rl.setPrompt("What is the name of the item you want to toggle? \n");
    rl.prompt();
    rl.once('line', (line) =>{
        name = line.trim();
        if(findItemByName(name)){
            rl.setPrompt("would you like to set the item's bought status as true or false?\n");
            rl.prompt();
            rl.once('line', (line) => {
                bool = line.trim();
                if(bool === 'true' || bool === 'false'){
                    toggleItemByName(name, bool);
                    baseCase();
                }
                else{
                    console.log(`We're sorry, the valid inputs are true and false, you entered ${bool}\n`);
                    baseCase();
                }
            })
        }
        else{
            console.log("Sorry, that item doesn't seem to exist, please try again\n");
            baseCase();
        }
    });
}

