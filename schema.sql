DROP DATABASE IF EXISTS Employee_tracker_DB;
CREATE database Employee_tracker_DB;
USE Employee_tracker_DB;
CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NULL,
  PRIMARY KEY (department_id)
);
CREATE TABLE role (
  role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(30,2) NULL,
  department_id INT NULL,
  PRIMARY KEY (role_id),
  FOREIGN KEY (department_id) REFERENCES department(department_id)
);
CREATE TABLE employee (
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (employee_id),
  FOREIGN KEY (role_id) REFERENCES role(role_id)
);
INSERT INTO department (department_name)
VALUES ("Web Develop");
INSERT INTO department (department_name)
VALUES ("Finance");
INSERT INTO role (title, salary, department_id)
VALUES ("Vice_President", 200000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 100000, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Justin","Lin", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Gordon", "Ramsay", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Yahoo", "Hello", 1, 2);

SELECT employee_id, first_name, last_name, title, department_name, salary, manager_id
FROM employee
LEFT JOIN role ON employee.role_id = role.role_id
LEFT JOIN department ON role.department_id = department.department_id
ORDER BY employee.employee_id;

SELECT * FROM department;
select * from role;
select * FROM employee;