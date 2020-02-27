DROP DATABASE IF EXISTS Employee_tracker_DB;
CREATE database Employee_tracker_DB;
USE Employee_tracker_DB;
CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NULL,
  PRIMARY KEY (department_id)
);
CREATE TABLE position (
  position_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(30,2) NULL,
  department_id INT NULL,
  PRIMARY KEY (position_id)
);
CREATE TABLE employee (
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  position_id INT NULL,
  department_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (employee_id)
);
INSERT INTO department (department_name)
VALUES ("Web Develop");
INSERT INTO department (department_name)
VALUES ("Finance");
INSERT INTO position (title, salary, department_id)
VALUES ("Vice_President", 200000, 1);
INSERT INTO position (title, salary, department_id)
VALUES ("Manager", 150000, 2);
INSERT INTO position (title, salary, department_id)
VALUES ("Engineer", 100000, 1);
INSERT INTO employee (first_name, last_name, role_id, department_id)
VALUES ("Justin","Lin", 3, 1);
INSERT INTO employee (first_name, last_name, role_id, department_id)
VALUES ("Gordon", "Ramsay", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, department_id)
VALUES ("Yahoo", "Hello", 1, 2);
SELECT * FROM department;
select * from position;
select * FROM employee;