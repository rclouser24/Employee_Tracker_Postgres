const inquirer = require('inquirer');
const EmployeeTracker = require('./db/queries'); 
const pool = require('./db/connection');

const tracker = new EmployeeTracker(pool);

async function mainMenu() {
  try {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees',
          'Add Department',
          'Add Role',
          'Add Employee',
          'Update Employee Role',
          'Exit',
        ],
      },
    ]);

    switch (action) {
      case 'View All Departments':
        await tracker.viewAllDepartments(); 
        break;

      case 'View All Roles':
        await tracker.viewAllRoles(); 
        break;

      case 'View All Employees':
        await tracker.viewAllEmployees(); 
        break;

      case 'Add Department': 
        const { departmentName } = await inquirer.prompt([
          {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department?',
          },
        ]);
        await tracker.addDepartment(departmentName);
        break;

      case 'Add Role':
        const { title, salary, departmentId } = await inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: 'What is their title?',
          },
          {
            type: 'input',
            name: 'salary',
            message: 'What is their salary?',
            validate: (input) => (!isNaN(input) ? true : 'Please enter a valid number'),
          },
          {
            type: 'input',
            name: 'departmentId', 
            message: 'What is the department ID?',
          },
        ]);
        await tracker.addRole(title, salary, departmentId);
        break;

      case 'Add Employee':
        const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
          {
            type: 'input',
            name: 'firstName',
            message: 'What is their first name?',
          },
          {
            type: 'input',
            name: 'lastName',
            message: 'What is their last name?',
          },
          {
            type: 'input',
            name: 'roleId',
            message: 'What is their role ID?',
          },
          {
            type: 'input',
            name: 'managerId',
            message: 'What is their manager ID?',
            validate: (input) =>
              input === '' || !isNaN(input) ? true : 'Please enter a valid number or leave blank for no manager',
          },
        ]);
        await tracker.addEmployee(firstName, lastName, roleId, managerId || null);
        break;

      case 'Update Employee Role':
        const { employeeId, newRoleId } = await inquirer.prompt([
          {
            type: 'input',
            name: 'employeeId',
            message: 'What is the employee ID?',
          },
          {
            type: 'input',
            name: 'newRoleId', 
            message: 'What is their new role ID?',
          },
        ]);
        await tracker.updateEmployeeRole(employeeId, newRoleId);
        break;

      case 'Exit':
        console.log('Goodbye!');
        process.exit();
    }

   
    mainMenu();
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

mainMenu();
