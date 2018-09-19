// intitialization of global variables
var list = []; // an array that will store each order
var totalPrice = 0;
var customerPay = "";
var change = 0;

function Order(itemCode,item,quantity,price) // the constructor for an individual order, as they will be objects
{
    this.itemCode = itemCode;
    this.item = item;
    this.quantity = quantity;
    this.price = price;
}

function init() // this function will be called when the page is loaded, to ensure the list is clear
{
    clearList();
    update();
}

function update() // this function is responsible for updating the page with values such as the total price and change
{
    totalPrice = calculateTotalPrice(list); // function called for calculating the total price by passing in the list array
    change = customerPay - totalPrice; // the calculation of the change
    document.getElementById("list").innerHTML = displayList(list);
    document.getElementById("totalPrice").innerHTML = "$" + totalPrice.toFixed(2);
    document.getElementById("customerPay").innerHTML = "$" + checkPaymentZero(customerPay);
    document.getElementById("change").innerHTML = "$" + change.toFixed(2);
}

function add(element,qty,p)  // this function is called when an item is added to the order list
{
    var item = element.name; // getting the 'name' value of the element which is the name of the item
    var quantity = document.getElementById(qty).value; // qty is the ID of the select tag, the value is the quantity of the item
    var price = p * quantity; // the price is multiplied by the quantity
    
    list.push(new Order(list.length + 1,item,quantity,price)); // here we add a new 'Order' object to the array
    update();
}

function take() // this function removes the last order in the array
{
    list.pop(); // pop() removes the last item in an array
    update();
}

function displayList(listOfObjects) // this function is responsible for determining what needs to be displayed on the screen
{
    var string = ""; // what needs to be displayed will be added to this empty string
    for (var i = 0; i < listOfObjects.length; i++) // here we loop through all the objects in the array and display the keys
    {
        string += // each loop, this will be concatenated onto the string
        '<table> <tr> <td>' + 'UFIDQ' + listOfObjects[i].itemCode +
        '</td> <td>' + listOfObjects[i].quantity + "x" +
        '</td> <td style = "padding-left : 40px; text-align : left;">' + listOfObjects[i].item + 
        '</td> <td> $' + listOfObjects[i].price.toFixed(2) + '</td> </tr> </table>' // we've created a table that holds the data from the object
    }   
    if (string === "") // if we have no orders, the string will be empty, so we will print that there are no orders
        return " <h6> Orders will appear here. </h6>"
    else return string;
}

function calculateTotalPrice(listOfObjects) // this function calculates the total price by cycling through all objects and adding up their prices
{
    var tp = 0;
    for (var i = 0; i < listOfObjects.length; i++)
        tp += listOfObjects[i].price;
    return tp;
}

function plus(num) // this function is used for the calculator responsible for typing the customer's payment
{
    var s = customerPay.toString();
    switch (num)
    {
        case "<":
            s = s.substring(0,s.length - 1); // to backspace in the calculator, we get the substring of the the entire string take one
            break;
        case "X":
            s = ""; 
            break;
        case ".":
            if (customerPay === "") s += (0 + num); // this ensures we add a zero in front of the decimal place if that is the first key pressed
            else s += num; 
            break;
        default:
            s += num;
            break;
    }
    customerPay = s;
    update();
}

function transact() // this function is called when the transaction button is pressed
{
    if (change < 0 || isNaN(change)) // isNaN() just checks if the change can actually be calculated - it will return true if this is the case
    {
        alert("The customer has paid an insufficient amount."); // if the change is negative, then the customer still owes more money
    }
    else if (totalPrice === 0)
    {
        if (customerPay === "") alert("Nothing has been ordered."); // this will pop up if nothing has been paid or ordered
        else alert("The customer has paid $" + customerPay + " for nothing - quick, take the money and run!"); // if the customer pays for nothing, take the money!
    }
    else
    {
        var string = "The customer has purchased the following items: \n \n"; // this prints all the orders in an alert window
        var pluralEnd = ""; // this variable is displayed after the item to add an 's' if there is more than one in quantity 
        for (var i = 0; i < list.length; i++)
        {
            if (list[i].quantity < 2) pluralEnd = ""; // check if the quantity is one to display no 's'
            else pluralEnd = "s"; // otherwise, add add an 's'
            string += "\u2022 " + list[i].quantity + " " + list[i].item + pluralEnd + " for $" + list[i].price.toFixed(2) + "\n";
        }
        string += "\n For a total of $" + totalPrice.toFixed(2) + "." + 
                  "\n The customer paid $" + customerPay +
                  "\n and received $" + change.toFixed(2) + " in change.";
        alert(string);
        update();
    }
}

function clearList() // this function clears the list by emptying the array
{
    list = [];
    update();
}

function checkPaymentZero(num) // if the string is empty, we return zero so we can at least display something
{
    if (num === "")
        return 0;
    else return num;
}