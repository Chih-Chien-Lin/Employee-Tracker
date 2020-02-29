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
        "Add Department",
        "Add Role",
        "Remove Employee",
        "Update Employee Role"
        // "Update Employee Manager"
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

        case "Add Department":
          AddDepartment();
          break;

        case "Add Role":
          AddRole();
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
  connection.query('SELECT * FROM role', function (err, res) {
    if (err) throw err;
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
          type: "list",
          message: "What's the new employee's role?",
          choices: [
            ...res.map(({ role_id, title }) => ({
              name: title,
              value: {
                role: title,
                role_id: role_id
              }
            }))
          ]
        },
        {
          name: "manager_id",
          type: "input",
          message: "What's the manager id of this employee?"
        }
      ])
      .then(function (answer) {
        const roleAns = answer.role;
        // console.log("role_id: ",roleAns.role_id)
        // console.log("role_title: ",roleAns.role)

        var queryAdd = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE (?,?,?,?)";
        connection.query(queryAdd, [answer.first_name, answer.last_name, roleAns.role_id, answer.manager_id], function (err, result) {
          if (err) throw err;
          displayEmployees();
        })
      })
  })
}
// function to Add Department
function AddDepartment() {
  connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    console.table(res)
    inquirer
      .prompt([
        {
          name: "department_name",
          type: "input",
          message: "What's the name of department you want to add?"
        }
      ])
      .then(function (answer) {

        var queryAdd = "INSERT INTO department (department_name) VALUE (?)";
        connection.query(queryAdd, [answer.department_name], function (err, result) {
          if (err) throw err;
          connection.query('SELECT * FROM department', function (err, res_newDep) {
            if (err) throw err;
            console.table(res_newDep)
            runSearch();
          })
        })
      })
  })
}

//function to Add role
function AddRole() {
  connection.query('SELECT * FROM role', function (err, res) {
    if (err) throw err;
    console.table(res)
    connection.query('SELECT * FROM department', function (err, res) {
      if (err) throw err;
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What's the name of title you want to add?"
        },
        {
          name : "department",
          type : "list",
          message: "What's the department this role belongs to?",
          choices:  [
            ...res.map(({ department_id, department_name }) => ({
              name: department_name,
              value: {
                department_id: department_id,
                department_name: department_name
              }
            }))
          ]
        },
        {
          name: "salary",
          type: "input",
          message: "What's the salary of this role?"
        }
      ])
      .then(function (answer) {

        var queryAdd = "INSERT INTO role (title, department_id, salary) VALUE (?,?,?)";
        connection.query(queryAdd, [answer.title, answer.department.department_id, answer.salary], function (err, result) {
          if (err) throw err;
          connection.query('SELECT * FROM role', function (err, res_newRole) {
            if (err) throw err;
            console.table(res_newRole)
            runSearch();
          })
        })
      })
  })
})
}

// function to Remove Employee
function RemoveEmployee() {
  connection.query('SELECT * FROM employee', function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: 'employee_name',
          type: 'list',
          message: 'Which employee do you want to update?',
          choices: [
            ...res.map(({ employee_id, first_name, last_name }) => ({
              name: first_name + ' ' + last_name,
              value: {
                name: first_name + ' ' + last_name,
                employee_id
              }
            }))
          ]
        }
      ])
      .then(function (answer) {
        var queryValidateRole = "SELECT * FROM employee";
        connection.query(queryValidateRole, function (err, res) {

          // console.log("empID: ",employeeID);
          var queryDelete = "DELETE FROM employee WHERE employee_id = ?";
          connection.query(queryDelete, answer.employee_name.employee_id, function (err, result) {
            if (err) throw err;
            displayEmployees();
          });
        });
      });
  });
}

// function to Update Employee Role
function UpdateRole() {
  connection.query('SELECT * FROM employee', function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: 'employee_name',
          type: 'list',
          message: 'Which employee do you want to update?',
          choices: [
            ...res.map(({ employee_id, first_name, last_name }) => ({
              name: first_name + ' ' + last_name,
              value: {
                name: first_name + ' ' + last_name,
                employee_id
              }
            }))
          ]
        }
      ])
      .then(answer => {
        console.log(answer.employee_name);
        const employeeName = answer.employee_name;
        const queryValidateRole = 'SELECT * FROM role';
        connection.query(queryValidateRole, function (err, roleResult) {
          if (err) throw err;
          inquirer
            .prompt([
              {
                name: 'role',
                message: `${employeeName.name} should be updated to which role?`,
                type: 'list',
                choices: [
                  ...roleResult.map(({ role_id, title }) => ({
                    name: title,
                    value: {
                      role_id,
                      title
                    }
                  }))
                ]
              }
            ])
            .then(roleAnswer => {
              const newRole = roleAnswer.role;
              console.log(newRole.role_id)
              console.log(newRole.title);
              const queryUpdateRole =
                'UPDATE employee SET role_id = ? WHERE employee_id = ?';
              connection.query(
                queryUpdateRole,
                [newRole.role_id, employeeName.employee_id],
                function (err, result) {
                  if (err) throw err;
                  runSearch();
                }
              );
            });
        });
      });
  });
}

// function to Update Employee Manager
// function UpdateManager() {

// }

