const { Pool } = require('pg');

const pool = new Pool({
  user: 'ryanclouser',     
  host: 'localhost',        
  database: 'employee_tracker_db', 
  password: 'CRUTCH24a', 
  port: 5432,                
});

module.exports = pool;