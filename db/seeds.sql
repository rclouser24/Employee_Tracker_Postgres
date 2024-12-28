-- Populate the department table
INSERT INTO department (id, name)
VALUES (1, 'Sales'),
       (2, 'Engineering'),
       (3, 'Finance'),
       (4, 'Legal');

-- Populate the role table
INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Salesperson', 100000, 1),
       (2, 'Engineer', 120000, 2),
       (3, 'Accountant', 85000, 3),
       (4, 'Lawyer', 120000, 4);

-- Populate the employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Robert', 'Hernandez', 1, NULL),
       (2, 'John', 'Doe', 2, 1),
       (3, 'Jane', 'Doe', 3, 2),
       (4, 'Alice', 'Smith', 4, 3),
       (5, 'Bob', 'Smith', 1, 4),
       (6, 'Charlie', 'Smith', 2, 5),
       (7, 'David', 'Smith', 3, 6),
       (8, 'Eve', 'Smith', 4, 7);