var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "abca22556688",
    database: "Employee_tracker_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    runSearch();
});


function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees by Department",
                "View All Employees by Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    displayEmployees();
                    break;

                case "View All Employees by Department":
                    displayEmployeesDepartment();
                    break;

                case "View All Employees by Manager":
                    displayEmployeesManager();
                    break;

                case "Add Employee":
                    AddEmployee();
                    break;

                case "Remove Employee":
                    RemoveEmployee();
                    break;

                case "Update Employee Role":
                    UpdateRole();
                    break;

                case "Update Employee Manager":
                    UpdateManager();
                    break;
            }
        });
}
// function to View All Employees
function displayEmployees(){
    var query = "SELECT employee_id, first_name, last_name, title, department_name, salary, manager_id ";
    query +="FROM employee ";
    query +="LEFT JOIN role ON employee.role_id = role.role_id ";
    query +="LEFT JOIN department ON role.department_id = department.department_id ";
    query +="ORDER BY employee.employee_id"
    // console.log(query);
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    })
}

// function to View All Employees by Department
function displayEmployeesDepartment(){
    var query = "SELECT employee_id, first_name, last_name, department_name ";
    query +="FROM employee ";
    query +="LEFT JOIN role ON employee.role_id = role.role_id ";
    query +="LEFT JOIN department ON role.department_id = department.department_id ";
    query +="ORDER BY department_name"
    // console.log(query);
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    })
}
// function to View All Employees by Manager
function displayEmployeesManager(){

}
// function to Add Employee
function AddEmployee(){

}
// function to Remove Employee
function RemoveEmployee(){

}
// function to Update Employee Role
function UpdateRole(){

}
// function to Update Employee Manager
function UpdateManager(){

}

