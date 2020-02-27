-- department id = 1
INSERT INTO department (department_name)
VALUES ("Web Develop");
-- department id = 2
INSERT INTO department (department_name)
VALUES ("Finance");
-- position id = 1
INSERT INTO position (title, salary, department_id)
VALUES ("Vice_President", 200000, 1);
-- position id = 2
INSERT INTO position (title, salary, department_id)
VALUES ("Engineer", 100000, 1);
-- manager id = 1
INSERT INTO manager (manager_name)
VALUES ("Gordon Ramsay")
--manager id = 2
INSERT INTO manager (manager_name)
VALUES ("Josh")

INSERT INTO employee (first_name, last_name, position_id, manager_id)
VALUES ("Justin","Lin", 2, 1);
INSERT INTO employee (first_name, last_name, position_id, manager_id)
VALUES ("Nice", "John", 1, 2);
INSERT INTO employee (first_name, last_name, position_id, manager_id)
VALUES ("Yahoo", "Hello", 2, 2);