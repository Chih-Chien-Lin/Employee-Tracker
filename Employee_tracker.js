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
                "test",
                "View All Employees",
                "View All Employees by Department",
                "View All Employees by Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager"
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

                case "test":
                    test();
                    break
            }
        });
}
// function to View All Employees
function displayEmployees() {
    var query = "SELECT employee_id, first_name, last_name, title, department_name, salary, manager_id ";
    query += "FROM employee ";
    query += "LEFT JOIN role ON employee.role_id = role.role_id ";
    query += "LEFT JOIN department ON role.department_id = department.department_id ";
    query += "ORDER BY employee.employee_id"
    // console.log(query);
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    })
}

// function to View All Employees by Department
function displayEmployeesDepartment() {
    var query = "SELECT employee_id, first_name, last_name, title, department_name, salary, manager_id ";
    query += "FROM employee ";
    query += "LEFT JOIN role ON employee.role_id = role.role_id ";
    query += "LEFT JOIN department ON role.department_id = department.department_id ";
    query += "ORDER BY department_name"
    // console.log(query);
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    })
}
// function to View All Employees by Manager
function displayEmployeesManager() {
    var query = "SELECT employee_id, first_name, last_name, title, department_name, salary, manager_id ";
    query += "FROM employee ";
    query += "LEFT JOIN role ON employee.role_id = role.role_id ";
    query += "LEFT JOIN department ON role.department_id = department.department_id ";
    query += "ORDER BY manager_id";
    // console.log(query);
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    })

}
// function to Add Employee
function AddEmployee() {
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "What's the new employee's first name?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What's the new employee's last name?"
            },
            {
                name: "role",
                type: "checkbox",
                message: "What's the new employee's role?",
                choices: [
                    "Vice_President",
                    "Engineer",
                    "Doctor"
                ]
            }
        ])
        .then(function (answer) {
            var queryValidateRole = "SELECT * FROM role";
            connection.query(queryValidateRole, function (err, res) {
                let roleID = 0;
                if (err) throw err;
                res.forEach(role => {
                    // console.log("role title: ",role.title)
                    // console.log("answer.role ",answer.role)
                    if (answer.role[0] === role.title) {
                        roleID = role.role_id;
                    }
                });
                // console.log("roleID: ",roleID);
                var queryAdd = "INSERT INTO employee (first_name, last_name, role_id) VALUE (?,?,?)";
                connection.query(queryAdd, [answer.first_name, answer.last_name, roleID], function (err, result) {
                    if (err) throw err;
                    runSearch();
                    displayEmployees()
                })
            })

        });
}
// function to Remove Employee
function RemoveEmployee() {
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "What's the first name of employee who was fired/quit?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What's the last name of employee who was fired/quit?"
            }
        ])
        .then(function (answer) {
            var queryValidateRole = "SELECT * FROM employee";
            connection.query(queryValidateRole, function (err, res) {
                if (err) throw err;
                let employeeID = 0;
                res.forEach(employee => {
                    // console.log("ans_first: ",answer.first_name);
                    // console.log("emp.first: ",employee.first_name);
                    // console.log("ans_las: ",answer.last_name);
                    // console.log("emp_last: ",employee.last_name,"-------");
                    if (answer.first_name === employee.first_name && answer.last_name === employee.last_name) {
                        console.log("Jump into here")
                        employeeID = employee.employee_id;
                    }
                });
                // console.log("empID: ",employeeID);
                var queryDelete = "DELETE FROM employee WHERE employee_id = ?";
                connection.query(queryDelete, employeeID, function (err, result) {
                    if (err) throw err;
                    // displayEmployees();
                    runSearch();
                });
            });
        });
}
// function to Update Employee Role
function UpdateRole() {
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "What's the first name of employee you want to change role?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What's the last name of employee you want to change role?"
            },
            {
                name: "role",
                type: "checkbox",
                message: "Which title to be changed to?",
                choices: [
                    "Vice_President",
                    "Engineer",
                    "Doctor"
                ]
            }
        ])
        .then(function (answer) {
            var queryValidateName = "SELECT * FROM employee";
            connection.query(queryValidateName, function (err, res) {
                if (err) throw err;
                let employeeID = 0;
                res.forEach(employee => {
                    if (answer.first_name === employee.first_name && answer.last_name === employee.last_name) {
                        console.log("Jump into here")
                        employeeID = employee.employee_id;
                    }
                    var queryValidateRole = "SELECT * FROM role";
                    connection.query(queryValidateRole, function (err, res) {
                        if (err) throw err;
                        let roleID = 0;
                        res.forEach(role => {
                            // console.log("role title: ",role.title)
                            // console.log("answer.role ",answer.role)
                            if (answer.role[0] === role.title) {
                                roleID = role.role_id;
                            }
                        });
                        console.log("role_id: ", roleID, " employee_id: ", employeeID)
                        var queryUpdateRole = "UPDATE employee SET role_id = ? WHERE employee_id = ?";
                        connection.query(queryUpdateRole, [roleID, employeeID], function (err, result) {
                            if (err) throw err
                            runSearch();
                        })
                    })
                });
            })
        })
}
// function to Update Employee Manager
function UpdateManager() {

}

function test() {
    var query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("test: ", res[0].role_id)
        runSearch()
    });
}
