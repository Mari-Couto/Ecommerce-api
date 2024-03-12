const password = process.env.MYSQL_PASSWORD;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: password,
  database: 'ecommercenovo'
});
