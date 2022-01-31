/// <reference path="../scripts/jquery-3.3.1.min.js" />


var db = openDatabase('contacts', '1.0', 'my contacts app', 2 * 1024 * 1024); 


db.transaction(function (tx) { 
 tx.executeSql('CREATE TABLE IF NOT EXISTS contacts(id integer primary key autoincrement, firstname, lastname, phonenumber)'); 
});


function addContact() { 
 var inputFirstName = document.getElementById("firstname").value; 
 var inputLastName = document.getElementById("lastname").value; 
 var inputPhoneNumber = document.getElementById("phonenumber").value; 
 if (inputFirstName !== "" && inputLastName !== "" && inputPhoneNumber !== "") { 
 db.transaction(function (tx) { 
 tx.executeSql('INSERT INTO contacts(firstname,lastname,phonenumber) VALUES (?,?,?)', 
[inputFirstName, inputLastName, inputPhoneNumber], function (tx, results) { 


 var contactRow = document.createElement("tr"); 
 var id = document.createElement("td"); 
 var firstname = document.createElement("td"); 
 var lastname = document.createElement("td"); 
 var phonenumber = document.createElement("td"); 
 var updateButton = document.createElement("td"); 
 var removeButton = document.createElement("td"); 


 id.textContent = results.insertId; 
 firstname.textContent = inputFirstName; 
 lastname.textContent = inputLastName; 
 phonenumber.textContent = inputPhoneNumber; 
 updateButton.innerHTML = '<button onclick="updateContact(' + results.insertId + 
')">Update</button>'; 
 removeButton.innerHTML = '<button onclick="removeContact(' + results.insertId + 
')">Delete</button>'; 
 //Add cells to the row
 contactRow.setAttribute("id", "c" + results.insertId); 
 contactRow.appendChild(id); 
 contactRow.appendChild(firstname); 
 contactRow.appendChild(lastname); 
 contactRow.appendChild(phonenumber); 
 contactRow.appendChild(updateButton); 
 contactRow.appendChild(removeButton); 


 document.getElementById("contacts").appendChild(contactRow); 
 }); 
 }); 
 } 
 else { 
 alert("You Must Enter The First Name, Last Name & Phone Number !!!!!"); 
 } 
} 


function updateContact(id) { 
 var inputFirstName = document.getElementById("firstname").value; 
 var inputLastName = document.getElementById("lastname").value; 
 var inputPhoneNumber = document.getElementById("phonenumber").value; 
 db.transaction(function (tx) { 
 tx.executeSql('SELECT * FROM contacts WHERE id=?', [id], function (tx, results) { 
 var contact = results.rows.item(0); 
 document.getElementById('id').value = contact.id; 
 document.getElementById('firstname').value = contact.firstname; 
 document.getElementById('lastname').value = contact.lastname; 
 document.getElementById('phonenumber').value = contact.phonenumber; 
 }); 
 }); 
} 


function save() { 
 var inputFirstName = document.getElementById("firstname").value; 
 var inputLastName = document.getElementById("lastname").value; 
 var inputPhoneNumber = document.getElementById("phonenumber").value; 
 if (inputFirstName !== "" && inputLastName !== "" && inputPhoneNumber !== "") { 
 db.transaction(function (tx) { 
 var id = document.getElementById('id').value; 
 var fName = document.getElementById('firstname').value; 
 var lName = document.getElementById('lastname').value; 
 var pNum = document.getElementById('phonenumber').value; 
 tx.executeSql('UPDATE contacts SET firstname=?, lastname=?, phonenumber=? WHERE id=?', [fName, 
lName, pNum, id]); 
 }); 
 alert("Data Updated Successfully !!!!!"); 
 } 
 else { 
 alert("You Must Enter The First Name, Last Name & Phone Number For Update Your Data !!!!!"); 
 } 
} 


function removeContact(id) {
db.transaction(function (tx) { 
 tx.executeSql('DELETE FROM contacts WHERE id=?', [id], function () { 
 //Dynamically remove the deleted contact from the table
 var contactTable = document.getElementById("contacts"); 
 var contactToDelete = document.getElementById("c" + id); 
 contactTable.removeChild(contactToDelete); 
 }); 
 }); 
} 


function listContacts() { 
 db.transaction(function (tx) { 
 tx.executeSql('SELECT * FROM contacts', [], function (tx, results) { 
 var len = results.rows.length; 
 var i; 
 for (i = 0; i < len; i++) { 


 var contactRow = document.createElement("tr"); 
 var id = document.createElement("td"); 
 var firstname = document.createElement("td"); 
 var lastname = document.createElement("td"); 
 var phonenumber = document.createElement("td"); 
 var updateButton = document.createElement("td"); 
 var removeButton = document.createElement("td"); 


 id.textContent = results.rows.item(i).id; 
 firstname.textContent = results.rows.item(i).firstname; 
 lastname.textContent = results.rows.item(i).lastname; 
 phonenumber.textContent = results.rows.item(i).phonenumber; 
 updateButton.innerHTML = '<button onclick="updateContact(' + results.rows.item(i).id + 
')">Update</button>'; 
 removeButton.innerHTML = '<button onclick="removeContact(' + results.rows.item(i).id + 
')">Delete</button>'; 


 contactRow.setAttribute("id", "c" + results.rows.item(i).id); 
 contactRow.appendChild(id); 
 contactRow.appendChild(firstname); 
 contactRow.appendChild(lastname); 
 contactRow.appendChild(phonenumber); 
 contactRow.appendChild(updateButton); 
 contactRow.appendChild(removeButton); 


 document.getElementById("contacts").appendChild(contactRow); 
 } 
 }); 
 }); 
} 


window.addEventListener("load", listContacts, true);