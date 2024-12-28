-- Populate the department table
INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

-- Populate the role table
INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', 100000, 1),
       ('Engineer', 120000, 2),
       ('Accountant', 85000, 3),
       ('Lawyer', 120000, 4);

-- Populate the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Robert', 'Hernandez', 1, NULL),
       ('John', 'Doe', 2, 1),
       ('Jane', 'Doe', 3, 2),
       ('Alice', 'Smith', 4, 3),
       ('Bob', 'Smith', 1, 4),
       ('Charlie', 'Smith', 2, 5),
       ('David', 'Smith', 3, 6),
       ('Eve', 'Smith', 4, 7);