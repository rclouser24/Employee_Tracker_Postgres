const pool = require('/db/connection');

class EmployeeTracker{
    constructor (pool){
        this.pool = pool;
    }

    async getAllDepartments(){
        const result = await this.pool.query('SELECT * FROM department');
        console.table(result.rows);
      }

    async getAllRoles(){
        const query = `
        SELECT 
          role.id, 
          role.title, 
          role.salary, 
          department.name AS department 
        FROM role 
        JOIN department ON role.department_id = department.id
      `;
      const result = await this.pool.query(query);
      console.table(result.rows);
    }

    async getAllEmployees(){
        const query = `
        SELECT 
          employee.id, 
          employee.first_name, 
          employee.last_name, 
          role.title AS job_title, 
          department.name AS department, 
          role.salary, 
          CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id
      `;
      const result = await this.pool.query(query);
      console.table(result.rows);
    }   

    async addDepartment(name){
        const query = 'INSERT INTO department (name) VALUES ($1)';
        await this.pool.query(query, [name]);
        console.log(`Department '${name}' added successfully.`);
    }

    async addRole(title, salary, departmentId){
        const query = 
        `INSERT INTO role (title, salary, department_id) 
        VALUES ($1, $2, $3)`;
    await this.pool.query(query, [title, salary, departmentId]);
    console.log(`Role '${title}' added successfully.`);
    }

    async addEmployee(firstName, lastName, roleId, managerId){
        const query = `
        INSERT INTO employee (first_name, last_name, role_id, manager_id) 
        VALUES ($1, $2, $3, $4)`;        
        await this.pool.query(query, [firstName, lastName, roleId, managerId]);
        console.log(`Employee '${firstName} ${lastName}' added successfully.`);
    }

    async updateEmployeeRole(employeeId, newRoleId){
        const query = `
      UPDATE employee 
      SET role_id = $1 
      WHERE id = $2
    `;
    await this.pool.query(query, [newRoleId, employeeId]);
    console.log(`Updated employee ID ${employeeId} with new role ID ${newRoleId}.`);
    }


}